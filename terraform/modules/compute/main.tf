resource "oci_core_instance" "main" {
  compartment_id      = var.compartment_id
  availability_domain = var.availability_domain
  display_name        = "${var.project_name}-instance"
  shape               = "VM.Standard.A1.Flex"

  shape_config {
    ocpus         = 4
    memory_in_gbs = 24
  }

  source_details {
    source_type             = "image"
    source_id               = var.image_ocid
    boot_volume_size_in_gbs = 50
  }

  create_vnic_details {
    subnet_id        = var.subnet_id
    assign_public_ip = true
    nsg_ids          = [var.nsg_id]
    display_name     = "${var.project_name}-vnic"
  }

  metadata = {
    ssh_authorized_keys = var.ssh_public_key
    user_data           = var.user_data
  }

  freeform_tags = { project = var.project_name }
}

# ── 100 GB block volume for persistent container data ────────────────────────
resource "oci_core_volume" "data" {
  compartment_id      = var.compartment_id
  availability_domain = var.availability_domain
  display_name        = "${var.project_name}-data-vol"
  size_in_gbs         = 100
  vpus_per_gb         = 10 # Balanced performance (Always Free eligible)

  freeform_tags = { project = var.project_name }
}

resource "oci_core_volume_attachment" "data" {
  attachment_type                     = "paravirtualized"
  instance_id                         = oci_core_instance.main.id
  volume_id                           = oci_core_volume.data.id
  display_name                        = "${var.project_name}-data-attach"
  is_shareable                        = false
  is_pv_encryption_in_transit_enabled = false
}
