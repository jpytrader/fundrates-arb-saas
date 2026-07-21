data "oci_objectstorage_namespace" "main" {
  compartment_id = var.compartment_id
}

resource "oci_objectstorage_bucket" "supabase_storage" {
  compartment_id = var.compartment_id
  namespace      = data.oci_objectstorage_namespace.main.namespace
  name           = "${var.project_name}-storage"
  access_type    = "NoPublicAccess"
  storage_tier   = "Standard"

  freeform_tags = { project = var.project_name }
}

# ── IAM user dedicated to Supabase Storage S3 access ────────────────────────
resource "oci_identity_user" "storage" {
  compartment_id = var.tenancy_ocid # IAM users live in the tenancy root
  name           = "${var.project_name}-storage-user"
  description    = "S3-compatible access for Supabase Storage (${var.project_name})"

  freeform_tags = { project = var.project_name }
}

resource "oci_identity_group" "storage" {
  compartment_id = var.tenancy_ocid
  name           = "${var.project_name}-storage-group"
  description    = "Group for Supabase Storage S3 access (${var.project_name})"

  freeform_tags = { project = var.project_name }
}

resource "oci_identity_user_group_membership" "storage" {
  user_id  = oci_identity_user.storage.id
  group_id = oci_identity_group.storage.id
}

resource "oci_identity_policy" "storage" {
  compartment_id = var.compartment_id
  name           = "${var.project_name}-storage-policy"
  description    = "Allows Supabase Storage user to manage the storage bucket"

  statements = [
    "Allow group ${oci_identity_group.storage.name} to manage buckets in compartment id ${var.compartment_id} where target.bucket.name='${oci_objectstorage_bucket.supabase_storage.name}'",
    "Allow group ${oci_identity_group.storage.name} to manage objects in compartment id ${var.compartment_id} where target.bucket.name='${oci_objectstorage_bucket.supabase_storage.name}'",
  ]
}

# ── S3-compatible customer secret key ────────────────────────────────────────
resource "oci_identity_customer_secret_key" "storage" {
  user_id      = oci_identity_user.storage.id
  display_name = "${var.project_name}-storage-s3-key"
}
