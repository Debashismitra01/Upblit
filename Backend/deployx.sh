#!/bin/bash
set -e

# Input Arguments
URL="$1"
PROJECT="$2"
PORT="$3"

BASE_DIR="/mnt/c/Users/mdeba/OneDrive/Desktop/DeployX"
SITE_DIR="$BASE_DIR/sites/$PROJECT"

mkdir -p "$BASE_DIR/sites"

echo "🔄 Cloning and building project..."

# Step 1: Run build script inside Docker
docker run --rm \
    -v "$BASE_DIR:/mnt/c/Users/mdeba/OneDrive/Desktop/DeployX" \
    -v "$PWD/build-runner:/app" \
    -w /app \
    node:lts \
    bash build.sh "$URL" "$PROJECT"

# Optional: Fix permissions (for WSL/Linux)
sudo chown -R $USER:$USER "$SITE_DIR" 2>/dev/null || true

# Step 2: Create Dockerfile for production
cat > "$SITE_DIR/Dockerfile" <<EOF
FROM node:lts
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 3000
CMD ["npx", "next", "start", "-p", "3000"]
EOF

# Step 3: Build Docker image and run container
echo "🐳 Building Docker image..."
docker build -t "$PROJECT-runtime" "$SITE_DIR"

echo "🚀 Running Docker container on port $PORT..."
docker rm -f "$PROJECT-container" 2>/dev/null || true
docker run -d -p $PORT:3000 --name "$PROJECT-container" "$PROJECT-runtime"

# Step 5: Generate NGINX config and reload
bash ./generate-nginx.sh

echo ""
echo "✅ Project '$PROJECT' deployed at: http://$PROJECT.deployx.local (port $PORT)"
echo ""
