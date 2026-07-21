output "instance_public_ip" {
  description = "Public IP of the compute instance"
  value       = oci_core_instance.main.public_ip
}

output "instance_private_ip" {
  description = "Private IP of the compute instance (used as LB backend)"
  value       = oci_core_instance.main.private_ip
}

output "instance_id" {
  description = "OCID of the compute instance"
  value       = oci_core_instance.main.id
}
