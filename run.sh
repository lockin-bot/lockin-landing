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

PORT="${PORT:-3000}"

ensure_next_dev_lock_available() {
  local lock_file="${SCRIPT_DIR}/.next/dev/lock"
  if [[ ! -e "$lock_file" ]]; then
    return
  fi

  if command -v lsof >/dev/null 2>&1; then
    local lock_pids
    lock_pids="$(lsof -t "$lock_file" 2>/dev/null || true)"
    if [[ -n "$lock_pids" ]]; then
      echo "Stopping existing Next.js dev process(es): ${lock_pids}"
      # shellcheck disable=SC2086
      kill $lock_pids 2>/dev/null || true
      for _ in {1..20}; do
        sleep 0.2
        if ! lsof -t "$lock_file" >/dev/null 2>&1; then
          break
        fi
      done
    fi
  fi

  # Remove stale lock files left by previously crashed dev sessions.
  if [[ -e "$lock_file" ]] && ! lsof -t "$lock_file" >/dev/null 2>&1; then
    rm -f "$lock_file"
  fi
}

ensure_port_available() {
  if ! command -v lsof >/dev/null 2>&1; then
    return
  fi

  local pids
  pids="$(lsof -ti "tcp:${PORT}" -sTCP:LISTEN || true)"
  if [[ -z "$pids" ]]; then
    return
  fi

  echo "Port ${PORT} is in use. Stopping existing listener(s): ${pids}"
  # shellcheck disable=SC2086
  kill $pids 2>/dev/null || true

  for _ in {1..20}; do
    sleep 0.2
    if ! lsof -ti "tcp:${PORT}" -sTCP:LISTEN >/dev/null 2>&1; then
      return
    fi
  done

  echo "Error: port ${PORT} is still in use after stopping existing listener(s)."
  echo "Set a different port, e.g. PORT=3001 ./run"
  exit 1
}

if [[ "$MODE" == "dev" ]]; then
  ensure_next_dev_lock_available
  # Reliable auto-refresh across environments where native file watching is flaky.
  # Disable with AUTO_REFRESH_POLLING=0 ./run
  if [[ "${AUTO_REFRESH_POLLING:-1}" == "1" ]]; then
    export CHOKIDAR_USEPOLLING=1
    export WATCHPACK_POLLING=true
  fi
fi
ensure_port_available

if [[ "$MODE" == "prod" ]]; then
  echo "Building and starting production server on port ${PORT}..."
  npm run build
  exec npm run start -- --port "$PORT"
fi

echo "Starting development server on port ${PORT}..."
DEV_BUNDLER="${DEV_BUNDLER:-webpack}"
if [[ "$DEV_BUNDLER" == "webpack" ]]; then
  exec npm run dev -- --webpack --port "$PORT"
fi

exec npm run dev -- --port "$PORT"
