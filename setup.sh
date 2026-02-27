#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

if ! command -v npm >/dev/null 2>&1; then
  echo "Error: npm is required but was not found in PATH."
  exit 1
fi

if [[ ! -f package.json ]]; then
  echo "Error: package.json not found. Run this script from the repository root."
  exit 1
fi

echo "Installing dependencies with npm ci..."
npm ci
echo "Setup complete."
