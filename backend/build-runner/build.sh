#!/bin/bash
set -e

URL="$1"
PROJECT="$2"
SITE_DIR="/mnt/c/Users/mdeba/OneDrive/Desktop/DeployX/sites"

mkdir -p "$SITE_DIR"
cd "$SITE_DIR"

rm -rf "$PROJECT"
git clone "$URL" "$PROJECT"
cd "$PROJECT"

npm install
npx next build
