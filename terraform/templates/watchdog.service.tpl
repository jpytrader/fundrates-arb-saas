#!/bin/bash
# fra-watchdog.sh
# Runs every 60 s via systemd timer. Checks container health, retries × 3,
# then rolls back to the :stable image tag and sends an SMTP alert.
#
# Env vars expected (injected by cloud-init into /data/watchdog/.env):
#   SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM, ALERT_TO, DOMAIN

set -euo pipefail

STATE_DIR=/data/watchdog/state
mkdir -p "$STATE_DIR"

# Source watchdog env (SMTP creds etc.)
# shellcheck source=/data/watchdog/.env
if [[ -f /data/watchdog/.env ]]; then
  # Use a safe source that handles quoted values
  set -a; source /data/watchdog/.env; set +a
fi

WATCHED_CONTAINERS=(
  supabase-db
  supabase-kong
  supabase-auth
  supabase-rest
  supabase-realtime
  supabase-storage
  supabase-functions
  uptime-kuma
  grafana
)

# Map container → compose project file
declare -A COMPOSE_FILE=(
  [supabase-db]=/data/supabase/docker-compose.yml
  [supabase-kong]=/data/supabase/docker-compose.yml
  [supabase-auth]=/data/supabase/docker-compose.yml
  [supabase-rest]=/data/supabase/docker-compose.yml
  [supabase-realtime]=/data/supabase/docker-compose.yml
  [supabase-storage]=/data/supabase/docker-compose.yml
  [supabase-functions]=/data/supabase/docker-compose.yml
  [uptime-kuma]=/data/monitoring/docker-compose.yml
  [grafana]=/data/monitoring/docker-compose.yml
)

# Map container → compose service name
declare -A SERVICE_NAME=(
  [supabase-db]=db
  [supabase-kong]=kong
  [supabase-auth]=auth
  [supabase-rest]=rest
  [supabase-realtime]=realtime
  [supabase-storage]=storage
  [supabase-functions]=functions
  [uptime-kuma]=uptime-kuma
  [grafana]=grafana
)

send_alert() {
  local subject="$1"
  local body="$2"
  local hostname
  hostname=$(hostname)
  curl --silent --fail \
    --url "smtp://${SMTP_HOST:-localhost}:${SMTP_PORT:-587}" \
    --ssl-reqd \
    --user "${SMTP_USER:-}:${SMTP_PASS:-}" \
    --mail-from "${SMTP_FROM:-noreply@${DOMAIN:-localhost}}" \
    --mail-rcpt "${ALERT_TO:-root@localhost}" \
    --upload-file - <<EOF || true
From: FRA Watchdog <${SMTP_FROM:-noreply@${DOMAIN:-localhost}}>
To: ${ALERT_TO:-root@localhost}
Subject: [FRA Watchdog] $subject on $hostname
Date: $(date -R)

$body
EOF
}

rollback_container() {
  local name="$1"
  local compose="${COMPOSE_FILE[$name]}"
  local service="${SERVICE_NAME[$name]}"
  local image
  image=$(docker inspect --format='{{.Config.Image}}' "$name" 2>/dev/null || echo "")

  if [[ -z "$image" ]]; then
    echo "[watchdog] $name: cannot determine image, skipping rollback"
    return
  fi

  # Tag current as :previous before touching anything
  docker tag "$image" "${image%%:*}:previous" 2>/dev/null || true

  # Attempt to pull :stable; fall back to :previous
  if docker pull "${image%%:*}:stable" 2>/dev/null; then
    docker compose -f "$compose" up -d --no-deps --force-recreate "$service"
    send_alert "Rolled back $name to :stable" \
      "Container $name was unhealthy after 3 consecutive checks.\nRolled back to ${image%%:*}:stable.\nCompose: $compose"
  else
    # :stable not found — restart from :previous tag
    docker tag "${image%%:*}:previous" "$image" 2>/dev/null || true
    docker compose -f "$compose" up -d --no-deps --force-recreate "$service"
    send_alert "Restarted $name (no :stable tag found)" \
      "Container $name was unhealthy after 3 consecutive checks.\nNo :stable tag found. Restarted from current image.\nCompose: $compose"
  fi
}

re_tag_stable() {
  local name="$1"
  local image
  image=$(docker inspect --format='{{.Config.Image}}' "$name" 2>/dev/null || echo "")
  [[ -n "$image" ]] && docker tag "$image" "${image%%:*}:stable" 2>/dev/null || true
}

for container in "${WATCHED_CONTAINERS[@]}"; do
  count_file="$STATE_DIR/${container}.count"
  current_count=0
  [[ -f "$count_file" ]] && current_count=$(cat "$count_file")

  # Check if container even exists
  if ! docker inspect "$container" &>/dev/null; then
    echo "[watchdog] $container: not running, skipping"
    continue
  fi

  health=$(docker inspect --format='{{.State.Health.Status}}' "$container" 2>/dev/null || echo "none")

  if [[ "$health" == "unhealthy" ]]; then
    new_count=$((current_count + 1))
    echo "$new_count" > "$count_file"
    echo "[watchdog] $container: unhealthy (streak $new_count)"

    if [[ "$new_count" -ge 3 ]]; then
      echo "[watchdog] $container: 3 consecutive failures — triggering rollback"
      rollback_container "$container"
      echo "0" > "$count_file"
    fi
  elif [[ "$health" == "healthy" ]]; then
    if [[ "$current_count" -gt 0 ]]; then
      echo "[watchdog] $container: recovered after $current_count failures — tagging :stable"
      re_tag_stable "$container"
    fi
    echo "0" > "$count_file"
  else
    # Container is starting or health check is not configured
    echo "[watchdog] $container: health=$health (no action)"
  fi
done
