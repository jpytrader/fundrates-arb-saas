# ─── CI placeholder values for `terraform validate` ──────────────────────────
# These are syntactically-valid dummy values only — NOT real credentials.
# Used by scripts/tf-validate.sh and the validate GitHub Actions workflow.
# Never replace with real credentials; real values belong in terraform.tfvars
# (which is git-ignored) or in repository secrets.

tenancy_ocid        = "ocid1.tenancy.oc1..aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
user_ocid           = "ocid1.user.oc1..aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
fingerprint         = "aa:bb:cc:dd:ee:ff:00:11:22:33:44:55:66:77:88:99"
private_key_path    = "/dev/null"
region              = "ap-tokyo-1"
compartment_id      = "ocid1.compartment.oc1..aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
availability_domain = "RKlC:AP-TOKYO-1-AD-1"
ssh_public_key      = "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAI000000000000000000000000000000000000000000000 ci@validate"
domain_name         = "arb.example.com"
letsencrypt_email   = "ci@example.com"
# stripe_api_key intentionally omitted — defaults to "" (webhook resource skipped)
