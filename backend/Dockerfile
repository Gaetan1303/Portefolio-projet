FROM composer:2 AS vendor
WORKDIR /app
COPY composer.json composer.lock ./
RUN composer install --no-dev --no-interaction --prefer-dist --optimize-autoloader

FROM php:8.3-fpm-alpine AS php-fpm
RUN apk add --no-cache git unzip libpq-dev icu-dev oniguruma-dev zlib-dev curl bash \
    && docker-php-ext-install pdo pdo_pgsql intl opcache

WORKDIR /var/www/backend

# Copy application code
COPY . /var/www/backend

# Copy vendor from the builder stage
COPY --from=vendor /app/vendor /var/www/backend/vendor

# Ensure permissions
RUN chown -R www-data:www-data /var/www/backend && chmod -R 755 /var/www/backend/var || true

EXPOSE 8080

USER www-data

CMD ["php", "-S", "0.0.0.0:8080", "-t", "public", "public/index.php"]
