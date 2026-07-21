variable "compartment_id" {
  type = string
}

variable "tenancy_ocid" {
  description = "Tenancy OCID — IAM users must be created in the root tenancy"
  type        = string
}

variable "region" {
  type = string
}

variable "project_name" {
  type = string
}
