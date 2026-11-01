#!/bin/sh
set -eu
mkdir -p /verified-release
tar -xzf /artifact/release-linux-amd64.tar.gz -C /verified-release
openssl req -x509 -newkey rsa:2048 -nodes -keyout /var/ssl/private.key -out /var/ssl/fullchain.pem -days 1 -subj /CN=sdh.vlu.edu.vn >/dev/null 2>&1
cd /verified-release/backend
node ../node_modules/prisma/build/index.js migrate deploy
node dist/server.js >/tmp/backend.log 2>&1 &
cd /verified-release/frontend
HOSTNAME=localhost PORT=3000 node server.js >/tmp/frontend.log 2>&1 &
cd /verified-release/cms
HOSTNAME=127.0.0.1 PORT=3001 node server.js >/tmp/cms.log 2>&1 &
cd /verified-release
if ! node /verify/runtime.mjs; then
  cat /tmp/backend.log /tmp/frontend.log /tmp/cms.log
  exit 1
fi
