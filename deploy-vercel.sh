#!/usr/bin/env bash
# Deploy this static site to Vercel via the v13 Deployment API (inline files).
# Usage: VERCEL_TOKEN=xxx bash deploy-vercel.sh
set -e
cd "$(dirname "$0")"

: "${VERCEL_TOKEN:?Set VERCEL_TOKEN env var}"
TEAM="team_WqfC8JfDBfaIpTiPrPrWFiym"
PROJECT="neon-auth"
API="https://api.vercel.com"

# Collect deployable files (site content + vercel.json config, NOT local dev scripts)
FILES=$(ls index.html manifest.json croxy-logo.png vercel.json assets/*.js assets/*.css 2>/dev/null)

# Build JSON payload with inline file contents (base64 to survive JSON escaping)
PAYLOAD="{\"name\":\"$PROJECT\",\"target\":\"production\",\"files\":["
first=1
for f in $FILES; do
  B64=$(base64 -w0 "$f")
  if [ $first -eq 1 ]; then first=0; else PAYLOAD+=","; fi
  PAYLOAD+="{\"file\":\"$f\",\"data\":\"$B64\",\"encoding\":\"base64\"}"
done
PAYLOAD+="]}"
printf '%s' "$PAYLOAD" > payload.tmp.json

echo "Uploading $(echo "$FILES" | wc -l) files ($(du -h payload.tmp.json | cut -f1)) to Vercel..."
RESP=$(curl -s -X POST "$API/v13/deployments?teamId=$TEAM&skipAutoDetectionConfirmation=1" \
  -H "Authorization: Bearer $VERCEL_TOKEN" \
  -H "Content-Type: application/json" \
  --data-binary @payload.tmp.json)
rm -f payload.tmp.json

# Extract deployment URL and id
DEPLOY_URL=$(echo "$RESP" | grep -o '"url":"[^"]*"' | head -1 | cut -d'"' -f4)
DEPLOY_ID=$(echo "$RESP" | grep -o '"id":"[^"]*"' | head -1 | cut -d'"' -f4)

if [ -z "$DEPLOY_URL" ]; then
  echo "DEPLOY FAILED. Response:"
  echo "$RESP" | head -20
  exit 1
fi

echo "Deployment created: $DEPLOY_URL (id: $DEPLOY_ID)"
echo "Waiting for build to finish..."

# Poll until READY or ERROR
for i in $(seq 1 60); do
  sleep 2
  STATE=$(curl -s -H "Authorization: Bearer $VERCEL_TOKEN" "$API/v13/deployments/$DEPLOY_ID?teamId=$TEAM" | grep -o '"readyState":"[^"]*"' | head -1 | cut -d'"' -f4)
  echo "  [$i] state: $STATE"
  if [ "$STATE" = "READY" ] || [ "$STATE" = "ERROR" ] || [ "$STATE" = "CANCELED" ]; then
    break
  fi
done

if [ "$STATE" = "READY" ]; then
  echo ""
  echo "SUCCESS: https://$DEPLOY_URL"
else
  echo "Final state: $STATE"
  curl -s -H "Authorization: Bearer $VERCEL_TOKEN" "$API/v13/deployments/$DEPLOY_ID/events?teamId=$TEAM" | head -40
  exit 1
fi
