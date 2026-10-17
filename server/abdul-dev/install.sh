#!/usr/bin/env bash
set -euo pipefail
[[ $EUID == 0 ]] || { echo 'Run with sudo on the prepared server.' >&2; exit 1; }
cd "$(dirname "$0")/../.."
for command in docker curl git python3 flock timeout sync systemctl; do command -v "$command" >/dev/null; done
docker compose version >/dev/null
docker network inspect xsolutions-proxy >/dev/null
[[ $(uname -m) == aarch64 ]] || { echo 'This installation expects ARM64.' >&2; exit 1; }
for path in /opt/shoe-specialist-abdul-dev /var/lib/shoe-specialist-abdul-dev-deploy /usr/local/share/shoe-specialist-abdul-dev; do
  [[ ! -L "$path" ]] || { echo 'Installation directories must not be symlinks.' >&2; exit 1; }
done
was_active=false
if systemctl is-active --quiet shoe-specialist-abdul-dev-update.timer; then was_active=true; fi
if systemctl cat shoe-specialist-abdul-dev-update.timer >/dev/null 2>&1; then systemctl stop shoe-specialist-abdul-dev-update.timer; fi
if systemctl cat shoe-specialist-abdul-dev-update.service >/dev/null 2>&1; then systemctl stop shoe-specialist-abdul-dev-update.service; fi
install -d -o root -g root -m 755 /opt/shoe-specialist-abdul-dev /usr/local/share/shoe-specialist-abdul-dev
install -d -o root -g root -m 700 /var/lib/shoe-specialist-abdul-dev-deploy
# Serialize administrator installation with any directly invoked updater too.
exec 9>/var/lib/shoe-specialist-abdul-dev-deploy/update.lock
flock -w 120 9
install -o root -g root -m 644 server/abdul-dev/compose.yaml /usr/local/share/shoe-specialist-abdul-dev/compose.yaml
install -o root -g root -m 755 server/abdul-dev/update-release.sh /usr/local/sbin/shoe-specialist-abdul-dev-update
install -o root -g root -m 644 server/abdul-dev/shoe-specialist-abdul-dev-update.service /etc/systemd/system/shoe-specialist-abdul-dev-update.service
install -o root -g root -m 644 server/abdul-dev/shoe-specialist-abdul-dev-update.timer /etc/systemd/system/shoe-specialist-abdul-dev-update.timer
# The retention observer and timer use this application's updater lock.
# Release our installation lock before installing the observer and shared timer.
flock -u 9
exec 9>&-
python3 server/retention/install_retention.py --config server/abdul-dev/retention.json --service shoe-specialist-abdul-dev-update.service
systemctl daemon-reload
if [[ "$was_active" == true ]]; then systemctl start shoe-specialist-abdul-dev-update.timer; fi
echo 'Installed shoe-specialist-abdul-dev runtime and automatic image retention; existing app timer state preserved. For first setup, prepare HTTPS route then enable --now shoe-specialist-abdul-dev-update.timer.'
