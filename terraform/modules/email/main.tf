resource "oci_email_email_domain" "main" {
  compartment_id = var.compartment_id
  name           = var.domain_name

  freeform_tags = { project = var.project_name }
}

resource "oci_email_dkim" "main" {
  email_domain_id = oci_email_email_domain.main.id
  name            = "${var.project_name}-dkim"
}

# Approved sender — Supabase Auth will send email from this address
resource "oci_email_sender" "noreply" {
  compartment_id = var.compartment_id
  email_address  = "noreply@${var.domain_name}"

  freeform_tags = { project = var.project_name }
}

# ── IAM user for SMTP authentication ────────────────────────────────────────
resource "oci_identity_user" "smtp" {
  compartment_id = var.tenancy_ocid # IAM users live in the root tenancy
  name           = "${var.project_name}-smtp-user"
  description    = "SMTP credentials for Supabase Auth email delivery (${var.project_name})"

  freeform_tags = { project = var.project_name }
}

resource "oci_identity_smtp_credential" "main" {
  user_id      = oci_identity_user.smtp.id
  description  = "${var.project_name} Supabase Auth SMTP"
}
