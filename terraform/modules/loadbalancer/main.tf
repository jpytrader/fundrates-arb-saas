resource "oci_load_balancer_load_balancer" "main" {
  compartment_id = var.compartment_id
  display_name   = "${var.project_name}-lb"
  shape          = "flexible"
  subnet_ids     = [var.subnet_id]
  is_private     = false

  shape_details {
    minimum_bandwidth_in_mbps = 10
    maximum_bandwidth_in_mbps = 10
  }

  freeform_tags = { project = var.project_name }
}

# ── Backend set: port 80 (HTTP → Traefik, used for ACME challenge) ───────────
resource "oci_load_balancer_backend_set" "http" {
  load_balancer_id = oci_load_balancer_load_balancer.main.id
  name             = "http-backends"
  policy           = "ROUND_ROBIN"

  health_checker {
    protocol          = "HTTP"
    port              = 80
    url_path          = "/"
    return_code       = 200
    interval_ms       = 10000
    timeout_in_millis = 3000
    retries           = 3
  }
}

resource "oci_load_balancer_backend" "http" {
  load_balancer_id = oci_load_balancer_load_balancer.main.id
  backendset_name  = oci_load_balancer_backend_set.http.name
  ip_address       = var.instance_private_ip
  port             = 80
  backup           = false
  drain            = false
  offline          = false
  weight           = 1
}

# ── Backend set: port 443 (HTTPS → Traefik, TCP pass-through) ───────────────
resource "oci_load_balancer_backend_set" "https" {
  load_balancer_id = oci_load_balancer_load_balancer.main.id
  name             = "https-backends"
  policy           = "ROUND_ROBIN"

  health_checker {
    protocol          = "TCP"
    port              = 443
    interval_ms       = 10000
    timeout_in_millis = 3000
    retries           = 3
  }
}

resource "oci_load_balancer_backend" "https" {
  load_balancer_id = oci_load_balancer_load_balancer.main.id
  backendset_name  = oci_load_balancer_backend_set.https.name
  ip_address       = var.instance_private_ip
  port             = 443
  backup           = false
  drain            = false
  offline          = false
  weight           = 1
}

# ── Listeners ────────────────────────────────────────────────────────────────
resource "oci_load_balancer_listener" "http" {
  load_balancer_id         = oci_load_balancer_load_balancer.main.id
  name                     = "http-listener"
  default_backend_set_name = oci_load_balancer_backend_set.http.name
  port                     = 80
  protocol                 = "TCP"
}

resource "oci_load_balancer_listener" "https" {
  load_balancer_id         = oci_load_balancer_load_balancer.main.id
  name                     = "https-listener"
  default_backend_set_name = oci_load_balancer_backend_set.https.name
  port                     = 443
  protocol                 = "TCP"
}
