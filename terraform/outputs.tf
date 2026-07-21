# ─── Network ──────────────────────────────────────────────────────────────────
output "instance_public_ip" {
  description = "Public IP of the Ampere A1 compute instance (point your A record here)"
  value       = module.compute.instance_public_ip
}

output "lb_public_ip" {
  description = "Public IP of the OCI Load Balancer (alternative A record target)"
  value       = module.loadbalancer.lb_public_ip
}

# ─── DNS checklist ────────────────────────────────────────────────────────────
output "dns_a_records" {
  description = "A records to create at your registrar (point all subdomains at the LB IP)"
  value = {
    "api.${var.domain_name}"     = module.loadbalancer.lb_public_ip
    "studio.${var.domain_name}"  = module.loadbalancer.lb_public_ip
    "status.${var.domain_name}"  = module.loadbalancer.lb_public_ip
    "metrics.${var.domain_name}" = module.loadbalancer.lb_public_ip
    "coolify.${var.domain_name}" = module.loadbalancer.lb_public_ip
  }
}

output "dns_dkim_cname_records" {
  description = "DKIM CNAME records to create at your registrar for OCI Email Delivery"
  value       = module.email.dkim_cname_records
}

# ─── SMTP ─────────────────────────────────────────────────────────────────────
output "smtp_host" {
  description = "OCI Email Delivery SMTP host"
  value       = module.email.smtp_host
}

output "smtp_username" {
  description = "OCI Email Delivery SMTP username (inject into Supabase Auth SMTP config)"
  value       = module.email.smtp_username
  sensitive   = true
}

output "smtp_approved_sender" {
  description = "From-address approved in OCI Email Delivery"
  value       = module.email.approved_sender_email
}

# ─── Object Storage ───────────────────────────────────────────────────────────
output "storage_bucket_name" {
  description = "OCI Object Storage bucket name used as the Supabase Storage S3 backend"
  value       = module.objectstorage.bucket_name
}

output "storage_namespace" {
  description = "OCI Object Storage namespace"
  value       = module.objectstorage.namespace
}

output "storage_s3_endpoint" {
  description = "S3-compatible endpoint for the storage bucket"
  value       = "https://${module.objectstorage.namespace}.compat.objectstorage.${var.region}.oraclecloud.com"
}

# ─── Credentials (sensitive) ──────────────────────────────────────────────────
output "grafana_password" {
  description = "Grafana admin password — log in at https://metrics.<domain>"
  value       = random_password.grafana_password.result
  sensitive   = true
}

output "dashboard_password" {
  description = "Supabase Studio / Coolify dashboard password"
  value       = random_password.dashboard_password.result
  sensitive   = true
}

output "fra_cron_secret" {
  description = "FRA_CRON_SECRET — must match the edge function environment variable"
  value       = random_password.fra_cron_secret.result
  sensitive   = true
}

output "pgsodium_root_key" {
  description = "64-char hex pgsodium root encryption key — injected into supabase-db at boot. Keep this secret; losing it makes Vault secrets unreadable."
  value       = random_id.pgsodium_root_key.hex
  sensitive   = true
}

# ─── Stripe ───────────────────────────────────────────────────────────────────
output "stripe_webhook_secret" {
  description = "Stripe webhook signing secret for the self-hosted endpoint. Inject as STRIPE_WEBHOOK_SECRET in the edge-functions environment. Only populated when stripe_api_key is set."
  value       = local.stripe_webhook_secret
  sensitive   = true
}

# ─── Post-apply summary ───────────────────────────────────────────────────────
output "next_steps" {
  description = "Post-apply checklist"
  value       = <<-EOT
    1. Create DNS A records for all subdomains → ${module.loadbalancer.lb_public_ip}
    2. Create DKIM CNAME records (see dns_dkim_cname_records output)
    3. Wait ~5 minutes for cloud-init to complete, then visit:
         https://coolify.${var.domain_name}  (register admin on first visit)
         https://studio.${var.domain_name}   (Supabase Studio)
    4. Deploy the fra-engine edge function:
         supabase functions deploy fra-engine --project-ref https://api.${var.domain_name}
    5. Retrieve sensitive values:  terraform output -json | jq '{grafana_password,dashboard_password,fra_cron_secret}'
    6. Stripe webhooks:
         If stripe_api_key was set, the webhook endpoint is already registered at
           https://api.${var.domain_name}/functions/v1/stripe-webhook
         and STRIPE_WEBHOOK_SECRET is injected into the supabase-functions container.
         Retrieve the secret with:  terraform output -raw stripe_webhook_secret
         If stripe_api_key was NOT set, register the endpoint manually in the Stripe
         Dashboard (see README § "Stripe webhook" for step-by-step instructions).
  EOT
}
