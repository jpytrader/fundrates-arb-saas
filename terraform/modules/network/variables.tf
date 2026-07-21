variable "compartment_id" {
  description = "OCID of the compartment"
  type        = string
}

variable "admin_cidr" {
  description = "CIDR allowed SSH ingress on the instance NSG"
  type        = string
}

variable "project_name" {
  description = "Short project name used in resource display names"
  type        = string
}
