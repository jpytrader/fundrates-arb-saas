output "namespace" {
  description = "OCI Object Storage namespace"
  value       = data.oci_objectstorage_namespace.main.namespace
}

output "bucket_name" {
  description = "Name of the Supabase Storage bucket"
  value       = oci_objectstorage_bucket.supabase_storage.name
}

output "access_key" {
  description = "S3-compatible access key ID"
  value       = oci_identity_customer_secret_key.storage.id
  sensitive   = true
}

output "secret_key" {
  description = "S3-compatible secret access key"
  value       = oci_identity_customer_secret_key.storage.key
  sensitive   = true
}
