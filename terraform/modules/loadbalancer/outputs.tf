output "lb_public_ip" {
  description = "Public IP of the OCI Load Balancer"
  value       = oci_load_balancer_load_balancer.main.ip_address_details[0].ip_address
}

output "lb_id" {
  description = "OCID of the load balancer"
  value       = oci_load_balancer_load_balancer.main.id
}
