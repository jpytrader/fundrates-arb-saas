variable "compartment_id" {
  type = string
}

variable "tenancy_ocid" {
  description = "Tenancy OCID — IAM users must be created in the root tenancy"
  type        = string
}

variable "domain_name" {
  description = "Root domain name. OCI Email Delivery will be configured for noreply@<domain_name>"
  type        = string
}

variable "region" {
  description = "OCI region identifier, used to build the SMTP host endpoint"
  type        = string
}

variable "project_name" {
  type = string
}
