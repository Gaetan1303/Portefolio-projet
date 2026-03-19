FROM php:8.3-fpm-alpine

RUN apk add --no-cache git unzip libpq-dev icu-dev oniguruma-dev zlib-dev curl \
    && docker-php-ext-install pdo pdo_pgsql intl opcache

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/backend

COPY . /var/www/backend

RUN if [ -f composer.json ]; then \
    composer config --no-plugins allow-plugins.symfony/runtime true && \
    composer install --no-interaction --prefer-dist; \
fi

EXPOSE 9000

CMD ["php-fpm"]
