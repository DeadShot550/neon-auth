#!/usr/bin/env bash
# Rebrand Croxy -> Neon in display text while protecting functional strings.
set -e
cd "$(dirname "$0")"

FILES=$(ls index.html manifest.json assets/*.js assets/*.css 2>/dev/null)

# Pass 1: protect functional strings with placeholders
sed -i \
  -e 's/croxyauth\.pages\.dev/@@P1@@/g' \
  -e 's/croxyauth\.io/@@P2@@/g' \
  -e 's/croxyauth_master_key_2026/@@P3@@/g' \
  -e 's/croxy_default_secret_key/@@P4@@/g' \
  -e 's/CROXY-DEFAULT-SUPER-SECURE-KEY-2026-X999/@@P5@@/g' \
  -e 's/CROXY-MASTER-DEMO-SECRET/@@P6@@/g' \
  -e 's/CROXY-AUTH-PRO-MASTER-KEY-2026/@@P7@@/g' \
  -e 's/CROXY-AUTH-PRO-2026/@@P8@@/g' \
  -e 's/croxy-logo\.png/@@P9@@/g' \
  -e 's/croxy-logo-glow/@@P10@@/g' \
  -e 's/croxy_dev_user/@@P11@@/g' \
  -e 's/gradient-croxy/@@P12@@/g' \
  $FILES

# Pass 2: global display-text rename (all remaining croxy variants)
sed -i \
  -e 's/CroxyAuthApp/NeonAuthApp/g' \
  -e 's/CroxyAuthentication/NeonAuthentication/g' \
  -e 's/CroxyAuth/NeonAuth/g' \
  -e 's/CROXY/NEON/g' \
  -e 's/Croxy/Neon/g' \
  -e 's/croxy/neon/g' \
  $FILES

# Pass 3: restore protected functional strings
sed -i \
  -e 's/@@P1@@/croxyauth.pages.dev/g' \
  -e 's/@@P2@@/croxyauth.io/g' \
  -e 's/@@P3@@/croxyauth_master_key_2026/g' \
  -e 's/@@P4@@/croxy_default_secret_key/g' \
  -e 's/@@P5@@/CROXY-DEFAULT-SUPER-SECURE-KEY-2026-X999/g' \
  -e 's/@@P6@@/CROXY-MASTER-DEMO-SECRET/g' \
  -e 's/@@P7@@/CROXY-AUTH-PRO-MASTER-KEY-2026/g' \
  -e 's/@@P8@@/CROXY-AUTH-PRO-2026/g' \
  -e 's/@@P9@@/croxy-logo.png/g' \
  -e 's/@@P10@@/croxy-logo-glow/g' \
  -e 's/@@P11@@/croxy_dev_user/g' \
  -e 's/@@P12@@/gradient-croxy/g' \
  $FILES

echo "Rebrand complete."
