# monitoring-compose.yaml.tpl
# Rendered by Terraform templatefile(). All $${...} references are Terraform variables.
# Written to /data/monitoring/docker-compose.yml by cloud-init.

version: "3.8"

networks:
  coolify:
    external: true
  supabase-net:
    external: true

volumes:
  uptime-kuma-data:
    driver: local
    driver_opts:
      type: none
      device: /data/monitoring/uptime-kuma
      o: bind
  prometheus-data:
    driver: local
    driver_opts:
      type: none
      device: /data/monitoring/prometheus/data
      o: bind
  grafana-data:
    driver: local
    driver_opts:
      type: none
      device: /data/monitoring/grafana
      o: bind

services:

  # ── Uptime Kuma — public status page + alerting ──────────────────────────
  uptime-kuma:
    container_name: uptime-kuma
    image: louislam/uptime-kuma:1
    restart: unless-stopped
    volumes:
      - uptime-kuma-data:/app/data
    networks:
      - coolify
    labels:
      - "traefik.enable=true"
      - "traefik.docker.network=coolify"
      - "traefik.http.routers.uptime-kuma.rule=Host(`status.${domain_name}`)"
      - "traefik.http.routers.uptime-kuma.entrypoints=websecure"
      - "traefik.http.routers.uptime-kuma.tls=true"
      - "traefik.http.routers.uptime-kuma.tls.certresolver=letsencrypt"
      - "traefik.http.services.uptime-kuma.loadbalancer.server.port=3001"

  # ── Prometheus — metrics collection ─────────────────────────────────────
  prometheus:
    container_name: prometheus
    image: prom/prometheus:v2.51.2
    restart: unless-stopped
    command:
      - --config.file=/etc/prometheus/prometheus.yml
      - --storage.tsdb.retention.time=30d
      - --storage.tsdb.path=/prometheus
    volumes:
      - /data/monitoring/prometheus/prometheus.yml:/etc/prometheus/prometheus.yml:ro
      - prometheus-data:/prometheus
    networks:
      - coolify
      - supabase-net

  # ── postgres-exporter — Supabase DB metrics for Prometheus ──────────────
  postgres-exporter:
    container_name: postgres-exporter
    image: quay.io/prometheuscommunity/postgres-exporter:v0.15.0
    restart: unless-stopped
    environment:
      DATA_SOURCE_NAME: postgresql://postgres:${postgres_password}@supabase-db:5432/postgres?sslmode=disable
      PG_EXPORTER_INCLUDE_DATABASES: postgres
    networks:
      - supabase-net
      - coolify

  # ── cAdvisor — Docker host & container resource metrics ──────────────────
  cadvisor:
    container_name: cadvisor
    image: gcr.io/cadvisor/cadvisor:v0.49.1
    restart: unless-stopped
    privileged: true
    devices:
      - /dev/kmsg
    volumes:
      - /:/rootfs:ro
      - /var/run:/var/run:ro
      - /sys:/sys:ro
      - /var/lib/docker:/var/lib/docker:ro
      - /dev/disk:/dev/disk:ro
    networks:
      - coolify

  # ── Grafana — dashboards ─────────────────────────────────────────────────
  grafana:
    container_name: grafana
    image: grafana/grafana:10.4.2
    restart: unless-stopped
    environment:
      GF_SECURITY_ADMIN_USER: admin
      GF_SECURITY_ADMIN_PASSWORD: ${grafana_password}
      GF_USERS_ALLOW_SIGN_UP: "false"
      GF_SERVER_ROOT_URL: https://metrics.${domain_name}
      GF_SMTP_ENABLED: "false"
    volumes:
      - grafana-data:/var/lib/grafana
      - /data/monitoring/grafana/provisioning:/etc/grafana/provisioning:ro
    networks:
      - coolify
      - supabase-net
    labels:
      - "traefik.enable=true"
      - "traefik.docker.network=coolify"
      - "traefik.http.routers.grafana.rule=Host(`metrics.${domain_name}`)"
      - "traefik.http.routers.grafana.entrypoints=websecure"
      - "traefik.http.routers.grafana.tls=true"
      - "traefik.http.routers.grafana.tls.certresolver=letsencrypt"
      - "traefik.http.services.grafana.loadbalancer.server.port=3000"
