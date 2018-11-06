FROM ronaldfox2020/orbis-training-docker:base

MAINTAINER Ronald Cutisaca <ronaldfox2015@gmail.comm>

LABEL maintainer="NGINX Docker Maintainers <docker-maint@nginx.com>"

ENV NGINX_VERSION 1.13.8

RUN apk update \
	&& apk add nginx \
	&& adduser -D -g 'www' www \
	&& mkdir /www \
	&& chown -R www:www /var/lib/nginx \
	&& chown -R www:www /www \
	&& chown -R www:www /var/www/html


COPY nginx.conf /etc/nginx/nginx.conf
COPY nginx.vh.default.conf /etc/nginx/conf.d/default.conf
COPY php-fpm.conf /usr/local/etc/php-fpm.d/www.conf

EXPOSE 80

STOPSIGNAL SIGTERM

COPY ./entrypoint.sh /init/entrypoint.sh
RUN chmod 755 /init/entrypoint.sh
ENTRYPOINT ["/init/entrypoint.sh"]
