#####
# Root multi-stage Dockerfile
# - Default build (no --target) produces the backend image.
# - You can build the frontend image with: docker build --target frontend-runner -t my-frontend:latest .
#####

########################################
# Backend: install vendors
########################################
FROM composer:2 AS backend-vendor
WORKDIR /app
COPY backend/composer.json backend/composer.lock ./
RUN composer install --no-dev --no-interaction --prefer-dist --optimize-autoloader || true

########################################
# Backend: runtime image
########################################
FROM php:8.3-fpm-alpine AS backend-base
RUN apk add --no-cache git unzip libpq-dev icu-dev oniguruma-dev zlib-dev curl bash \
    && docker-php-ext-install pdo pdo_pgsql intl opcache || true

WORKDIR /var/www/backend
COPY backend/ /var/www/backend/
COPY --from=backend-vendor /app/vendor /var/www/backend/vendor
RUN chown -R www-data:www-data /var/www/backend && chmod -R 755 /var/www/backend/var || true
EXPOSE 9000
USER www-data
CMD ["php-fpm"]

########################################
# Frontend: deps and builder
########################################
FROM node:20-alpine AS frontend-deps
WORKDIR /app
COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci --no-audit --prefer-offline || true

FROM node:20-alpine AS frontend-builder
WORKDIR /app
COPY --from=frontend-deps /app/node_modules ./node_modules
COPY frontend/ ./
RUN npm run build || true

FROM node:20-alpine AS frontend-runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=frontend-builder /app/.next/standalone ./
COPY --from=frontend-builder /app/.next/static ./.next/static
COPY --from=frontend-builder /app/public ./public
COPY --from=frontend-builder /app/node_modules ./node_modules
EXPOSE 3000
CMD ["node", "server.js"]

########################################
# Default target (backend)
########################################
FROM backend-base AS final
