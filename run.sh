#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

if ! command -v npm >/dev/null 2>&1; then
  echo "Error: npm is required but was not found in PATH."
  exit 1
fi

MODE="${1:-dev}"

if [[ "$MODE" != "dev" && "$MODE" != "prod" ]]; then
  echo "Unknown mode: $MODE"
  echo "Usage: ./run.sh [dev|prod]"
  exit 1
fi

if [[ ! -d node_modules ]]; then
  echo "Dependencies not found. Run ./setup.sh first."
  exit 1
fi

if [[ "$MODE" == "prod" ]]; then
  echo "Building and starting production server..."
  npm run build
  exec npm run start
fi

echo "Starting development server..."
exec npm run dev
