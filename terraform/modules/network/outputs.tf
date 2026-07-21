output "public_subnet_id" {
  description = "OCID of the public subnet"
  value       = oci_core_subnet.public.id
}

output "vcn_id" {
  description = "OCID of the VCN"
  value       = oci_core_vcn.main.id
}

output "instance_nsg_id" {
  description = "OCID of the instance-level NSG (restricts SSH to admin_cidr)"
  value       = oci_core_network_security_group.instance.id
}
