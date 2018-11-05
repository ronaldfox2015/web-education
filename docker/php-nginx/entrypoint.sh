#!/usr/bin/env sh

set -e

/usr/local/sbin/php-fpm -D && /usr/sbin/nginx -g 'daemon off;' && tail -f /var/log/nginx/app_error.log

