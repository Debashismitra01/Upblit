#!/bin/bash
set -e

PORTS_FILE="/var/deployx/ports.json"
TMP_FILE="/tmp/deployx-nginx.conf"
NGINX_FILE="/etc/nginx/sites-available/deployx"

# Start with empty config
echo "" > "$TMP_FILE"

# Create one server block per project (subdomain)
for project in $(jq -r 'keys[]' "$PORTS_FILE"); do
    port=$(jq -r ".\"$project\".port" "$PORTS_FILE")
    echo "
server {
    listen 80;
    server_name $project.deployx.local;

    location / {
        proxy_pass http://localhost:$port/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}" >> "$TMP_FILE"

    # Add to /etc/hosts if not already there
    if ! grep -q "$project.deployx.local" /etc/hosts; then
        echo "127.0.0.1 $project.deployx.local" | sudo -n tee -a /etc/hosts > /dev/null || { echo "❌ Need sudo access without password."; exit 1; }
    fi
done

# Copy to nginx with sudo
sudo -n cp "$TMP_FILE" "$NGINX_FILE" || { echo "❌ Need sudo access without password. ewq"; exit 1; }
sudo -n  ln -sf "$NGINX_FILE" /etc/nginx/sites-enabled/deployx || { echo "❌ Need sudo access without password svfr."; exit 1; }
sudo -n nginx -t && sudo -n service nginx reload || { echo "❌ Need sudo access without password. rsdv"; exit 1; }

echo "✅ NGINX subdomain config updated and reloaded."
