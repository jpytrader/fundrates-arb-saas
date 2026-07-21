# ─── Secrets (generated once, stored in tfstate) ──────────────────────────────
resource "random_password" "postgres_password" {
  length  = 32
  special = false
}

resource "random_password" "jwt_secret" {
  length  = 64
  special = false
}

resource "random_password" "dashboard_password" {
  length  = 24
  special = false
}

resource "random_password" "grafana_password" {
  length  = 24
  special = false
}

resource "random_password" "fra_cron_secret" {
  length  = 40
  special = false
}

resource "random_id" "pgsodium_root_key" {
  byte_length = 32   # 64-char lowercase hex; pgsodium root encryption key
}

# ─── Auto-resolve Ubuntu 22.04 ARM image when OCID not supplied ───────────────
data "oci_core_images" "ubuntu_arm" {
  count                    = var.ubuntu_image_ocid == "" ? 1 : 0
  compartment_id           = var.compartment_id
  operating_system         = "Canonical Ubuntu"
  operating_system_version = "22.04"
  shape                    = "VM.Standard.A1.Flex"
  sort_by                  = "TIMECREATED"
  sort_order               = "DESC"
  state                    = "AVAILABLE"
}

locals {
  image_ocid = (
    var.ubuntu_image_ocid != ""
    ? var.ubuntu_image_ocid
    : data.oci_core_images.ubuntu_arm[0].images[0].id
  )

  # Supabase public URLs
  api_url    = "https://api.${var.domain_name}"
  studio_url = "https://studio.${var.domain_name}"

  # ── Rendered sub-templates (passed as string variables into cloud-init) ──────
  supabase_compose = templatefile("${path.module}/templates/supabase-compose.yaml.tpl", {
    domain_name        = var.domain_name
    postgres_password  = random_password.postgres_password.result
    dashboard_password = random_password.dashboard_password.result
    jwt_secret         = random_password.jwt_secret.result
    fra_cron_secret    = random_password.fra_cron_secret.result
    pgsodium_root_key  = random_id.pgsodium_root_key.hex
    api_url            = local.api_url
    studio_url         = local.studio_url
    storage_namespace  = module.objectstorage.namespace
    storage_bucket     = module.objectstorage.bucket_name
    storage_region     = var.region
    storage_access_key = module.objectstorage.access_key
    storage_secret_key = module.objectstorage.secret_key
    smtp_host          = module.email.smtp_host
    smtp_port          = "587"
    smtp_user          = module.email.smtp_username
    smtp_password      = module.email.smtp_password
    smtp_sender        = module.email.approved_sender_email
    letsencrypt_email  = var.letsencrypt_email
  })

  monitoring_compose = templatefile("${path.module}/templates/monitoring-compose.yaml.tpl", {
    domain_name       = var.domain_name
    postgres_password = random_password.postgres_password.result
    grafana_password  = random_password.grafana_password.result
    letsencrypt_email = var.letsencrypt_email
  })

  # Watchdog bash script — read from file so cloud-init receives it base64-encoded
  watchdog_script = file("${path.module}/templates/watchdog.service.tpl")
}

# ─── Modules ──────────────────────────────────────────────────────────────────
module "network" {
  source = "./modules/network"

  compartment_id = var.compartment_id
  admin_cidr     = var.admin_cidr
  project_name   = var.project_name
}

module "email" {
  source = "./modules/email"

  compartment_id = var.compartment_id
  tenancy_ocid   = var.tenancy_ocid
  domain_name    = var.domain_name
  region         = var.region
  project_name   = var.project_name
}

module "objectstorage" {
  source = "./modules/objectstorage"

  compartment_id = var.compartment_id
  tenancy_ocid   = var.tenancy_ocid
  region         = var.region
  project_name   = var.project_name
}

module "compute" {
  source = "./modules/compute"

  compartment_id      = var.compartment_id
  availability_domain = var.availability_domain
  subnet_id           = module.network.public_subnet_id
  nsg_id              = module.network.instance_nsg_id
  image_ocid          = local.image_ocid
  ssh_public_key      = var.ssh_public_key
  project_name        = var.project_name

  user_data = base64encode(templatefile("${path.module}/templates/cloud-init.yaml.tpl", {
    domain_name        = var.domain_name
    letsencrypt_email  = var.letsencrypt_email
    jwt_secret         = random_password.jwt_secret.result
    fra_cron_secret    = random_password.fra_cron_secret.result
    postgres_password  = random_password.postgres_password.result
    pgsodium_root_key  = random_id.pgsodium_root_key.hex
    api_url            = local.api_url
    smtp_host          = module.email.smtp_host
    smtp_port          = "587"
    smtp_user          = module.email.smtp_username
    smtp_password      = module.email.smtp_password
    smtp_sender        = module.email.approved_sender_email
    supabase_compose   = local.supabase_compose
    monitoring_compose = local.monitoring_compose
    watchdog_script    = local.watchdog_script
  }))
}

module "loadbalancer" {
  source = "./modules/loadbalancer"

  compartment_id     = var.compartment_id
  subnet_id          = module.network.public_subnet_id
  instance_private_ip = module.compute.instance_private_ip
  project_name       = var.project_name
}
