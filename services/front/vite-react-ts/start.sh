#!/bin/sh

log() {
  echo "[INFO] $1"
}

error() {
  echo "[ERROR] $1" >&2
}

if [ -z "$VITE_PORT_FRONTEND" ]; then
  error "VITE_PORT_FRONTEND is not set!"
  exit 1
fi

if [ -z "$NODE_ENV" ]; then
  log "NODE_ENV is not set, defaulting to 'production'."
  export NODE_ENV="production"
fi

log "Installing dependencies..."
npm install --silent

log "Building the project..."
npm run build

log "Starting the server..."
serve ./dist -l "$VITE_PORT_FRONTEND"

log "Server is running on port $VITE_PORT_FRONTEND"
