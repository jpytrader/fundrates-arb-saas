# ─── OCI Identity ─────────────────────────────────────────────────────────────
variable "tenancy_ocid" {
  description = "OCID of your OCI tenancy"
  type        = string
}

variable "user_ocid" {
  description = "OCID of the OCI user that owns the API key"
  type        = string
}

variable "fingerprint" {
  description = "Fingerprint of the OCI API key"
  type        = string
}

variable "private_key_path" {
  description = "Path to the OCI API private key PEM file on the machine running Terraform"
  type        = string
}

variable "region" {
  description = "OCI region identifier (e.g. ap-tokyo-1, us-ashburn-1)"
  type        = string
}

variable "compartment_id" {
  description = "OCID of the compartment in which to create all resources"
  type        = string
}

variable "availability_domain" {
  description = "Availability domain name (e.g. RKlC:AP-TOKYO-1-AD-1). Find with: oci iam availability-domain list"
  type        = string
}

# ─── Networking ───────────────────────────────────────────────────────────────
variable "admin_cidr" {
  description = "CIDR that is allowed SSH (port 22) ingress. Restrict to your static IP for production."
  type        = string
  default     = "0.0.0.0/0"
}

# ─── Compute ──────────────────────────────────────────────────────────────────
variable "ssh_public_key" {
  description = "SSH public key content (paste the full key, not the file path)"
  type        = string
}

variable "ubuntu_image_ocid" {
  description = <<-EOT
    OCID of the Ubuntu 22.04 ARM64 platform image for your region.
    Find with: oci compute image list --compartment-id <tenancy-ocid>
               --operating-system "Canonical Ubuntu"
               --operating-system-version "22.04"
               --shape VM.Standard.A1.Flex
    Leave blank to auto-resolve via data source (requires list-images permission).
  EOT
  type        = string
  default     = ""
}

# ─── Domain ───────────────────────────────────────────────────────────────────
variable "domain_name" {
  description = "Root domain for this deployment (e.g. arb.example.com). Subdomains api, studio, status, metrics, coolify are derived from this."
  type        = string
}

variable "letsencrypt_email" {
  description = "Email address for Let's Encrypt TLS certificate notifications"
  type        = string
}

# ─── Supabase ─────────────────────────────────────────────────────────────────
variable "supabase_studio_port" {
  description = "Internal port that Supabase Studio listens on inside the compose network"
  type        = number
  default     = 3000
}

# ─── Tags ─────────────────────────────────────────────────────────────────────
variable "project_name" {
  description = "Short name used in OCI resource display names and freeform tags"
  type        = string
  default     = "fundrates-arb"
}
