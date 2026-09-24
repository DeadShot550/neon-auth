#!/usr/bin/env bash
# Swap the app's Firebase config from the old croxy project to the user's own.
# Usage: NEW_API_KEY=AIzaSy... bash firebase-swap.sh
set -e
cd "$(dirname "$0")"

: "${NEW_API_KEY:?Set NEW_API_KEY (starts with AIzaSy)}"

OLD_KEY="AIzaSyA_TRuF2WgHiCqvWRs7ffctGTn-Dq-G-Nc"
OLD_DB="https://auth-25ee4-default-rtdb.firebaseio.com"
OLD_AUTH="auth-25ee4.firebaseapp.com"
OLD_PROJ="auth-25ee4"
OLD_BUCKET="auth-25ee4.firebasestorage.app"
OLD_SENDER="761400163608"
OLD_APPID="1:761400163608:web:e66da47de9b34619ff326d"

NEW_PROJ="neonauth-65bb0"
NEW_NUM="229887260756"
NEW_APPID="1:229887260756:web:365f6d5d1b61d602fb15c1"
NEW_DB="https://neonauth-65bb0-default-rtdb.firebaseio.com"
NEW_AUTH="neonauth-65bb0.firebaseapp.com"
NEW_BUCKET="neonauth-65bb0.firebasestorage.app"

FILES=$(ls assets/*.js index.html 2>/dev/null)

for f in $FILES; do
  sed -i \
    -e "s|$OLD_KEY|$NEW_API_KEY|g" \
    -e "s|$OLD_DB|$NEW_DB|g" \
    -e "s|$OLD_AUTH|$NEW_AUTH|g" \
    -e "s|$OLD_PROJ|$NEW_PROJ|g" \
    -e "s|$OLD_BUCKET|$NEW_BUCKET|g" \
    -e "s|$OLD_SENDER|$NEW_NUM|g" \
    -e "s|$OLD_APPID|$NEW_APPID|g" \
    "$f"
done

echo "Firebase config swapped to project: $NEW_PROJ"
grep -rc "$NEW_PROJ" assets/*.js | grep -v ":0"
