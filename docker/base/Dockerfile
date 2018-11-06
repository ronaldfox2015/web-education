FROM php:7.2-fpm
MAINTAINER Aptitus Team <developers@aptitus.com>

RUN apt-get install -y \
    php71-curl \
    php71-mbstring \
    php71-mysqlnd \
    php71-mcrypt \
    php71-pecl-memcache \
    php71-pecl-memcached \
    php71-soap \
    php71-pecl-apcu \
    php71-pecl-imagick \
    php71-memcached \
    php71-memcache \
    php71-opcache \
    php71-zip

# Config PHP
COPY ./php.ini /etc/php.ini

ENV APP_DIR=/code
WORKDIR $APP_DIR