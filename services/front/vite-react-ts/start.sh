#!/bin/sh

log() {
  echo "[INFO] $1"
}

error() {
  echo "[ERROR] $1" >&2
}

# Validate VITE_PORT_FRONTEND
if [ -z "$VITE_PORT_FRONTEND" ]; then
  error "VITE_PORT_FRONTEND is not set!"
  exit 1
fi

# Set NODE_ENV to production if not defined
if [ -z "$NODE_ENV" ]; then
  log "NODE_ENV is not set, defaulting to 'production'."
  export NODE_ENV="production"
fi

log "Checking for node_modules..."
if [ ! -d "./node_modules" ]; then
  log "node_modules not found. Installing dependencies..."
  npm ci --silent
else
  log "node_modules directory found. Skipping installation."
fi

# Check if the dist directory exists
if [ ! -d "./dist" ]; then
  log "dist directory not found. Running build..."
  npm run build
else
  log "dist directory found. Skipping build step."
fi

log "Starting the server..."
serve ./dist -l "$VITE_PORT_FRONTEND" --single

log "Server is running on port $VITE_PORT_FRONTEND"
