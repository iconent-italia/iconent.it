#!/bin/bash
# deploy.sh — push live su Vercel (iconent.it)
# Uso:
#   ./deploy.sh                  → commit con messaggio "update" + push
#   ./deploy.sh "fix homepage"   → commit con messaggio personalizzato + push

set -e
cd "$(dirname "$0")"

MSG="${1:-update}"

echo "→ Staging delle modifiche..."
git add .

if git diff --staged --quiet; then
  echo "✓ Nessuna modifica da committare. Tutto è già live."
  exit 0
fi

echo "→ Commit: \"$MSG\""
git commit -m "$MSG"

echo "→ Push a GitHub (Vercel deploya automaticamente)..."
git push

echo ""
echo "✅ Fatto. Vercel sta deployando..."
echo "   Link live (~30 secondi):  https://iconent-it.vercel.app"
echo "   Dashboard deploy:          https://vercel.com/iconent-italia/iconent-it/deployments"
