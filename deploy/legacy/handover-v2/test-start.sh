#!/usr/bin/env bash
set -euo pipefail
cd /bundle
if [[ ! -e /opt/sdh/current/runtime/bin/node ]]; then
  bash operations/install-release.sh 20261028-02
fi
sed -i 's|^DATABASE_URL=.*|DATABASE_URL=postgresql://vgg:handover_v2_test_only@db:5432/vgg_public|' /etc/sdh/backend.env
install -m 0644 config/vgg-frontend.service config/vgg-backend.service /etc/systemd/system/
systemd-analyze verify /etc/systemd/system/vgg-frontend.service /etc/systemd/system/vgg-backend.service
install -d /etc/nginx/tls/sdh.vlu.edu.vn
openssl req -x509 -newkey rsa:2048 -nodes -keyout /etc/nginx/tls/sdh.vlu.edu.vn/privkey.pem -out /etc/nginx/tls/sdh.vlu.edu.vn/fullchain.pem -days 1 -subj /CN=sdh.vlu.edu.vn >/dev/null 2>&1
cp config/sdh.nginx.conf /etc/nginx/conf.d/sdh.conf
nginx -t
nginx
runuser -u vgg -- /opt/sdh/current/runtime/bin/node --env-file=/etc/sdh/backend.env /opt/sdh/current/be/backend/dist/server.js &
runuser -u vgg -- env -u HOSTNAME -u NODE_OPTIONS /opt/sdh/current/runtime/bin/node --env-file=/etc/sdh/frontend.env /opt/sdh/current/fe/frontend/server.js &
wait
