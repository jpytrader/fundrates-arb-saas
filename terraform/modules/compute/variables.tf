variable "compartment_id" {
  type = string
}

variable "availability_domain" {
  type = string
}

variable "subnet_id" {
  type = string
}

variable "nsg_id" {
  type = string
}

variable "image_ocid" {
  type = string
}

variable "ssh_public_key" {
  type = string
}

variable "project_name" {
  type = string
}

variable "user_data" {
  description = "base64-encoded cloud-init payload"
  type        = string
}
