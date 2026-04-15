#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "==> JS syntax checks"
node --check assets/js/core.js
node --check assets/js/script.js
node --check assets/js/midjourney.js
node --check assets/js/cinematic.js

echo "==> HTML wiring checks"
rg -n "<script src=\"assets/js/core.js\"></script>" index.html midjourney.html cinematic.html >/dev/null
rg -n "<script src=\"assets/js/script.js\"" index.html >/dev/null
rg -n "<script src=\"assets/js/midjourney.js\"></script>" midjourney.html >/dev/null
rg -n "<script src=\"assets/js/cinematic.js\"></script>" cinematic.html >/dev/null
rg -n "assets/css/styles.css|assets/css/cinematic.css" cinematic.html >/dev/null

echo "==> Shared handler checks"
rg -n "function forge(StartNewPrompt|OpenCollections|ExportPrompt|ShowLayoutGrid|OpenSettings)" assets/js/core.js >/dev/null
rg -n "function (startNewPrompt|openCollections|exportPrompt|showLayoutGrid|openSettings)" assets/js/script.js assets/js/midjourney.js >/dev/null

echo "==> Repo hygiene checks"
if git ls-files | rg -q "_index\\.html"; then
  echo "Unexpected tracked orphan file: _index.html"
  exit 1
fi

echo "All regression smoke checks passed."
