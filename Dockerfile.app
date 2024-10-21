# Use the official PHP image as base
FROM php:8.2-fpm AS base

# Install dependencies and PHP extensions
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libzip-dev \
    zip \
    unzip \
    libicu-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd pdo_mysql zip intl

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/local/bin/composer

# Set working directory
WORKDIR /var/www/html

# Copy only the necessary files for dependency installation
COPY composer.json composer.lock ./

# Install Composer dependencies
RUN composer install --prefer-dist --no-scripts --no-dev --no-autoloader

# Copy the rest of the application code
COPY . .

# Optimize Composer autoloader
RUN composer dump-autoload --optimize

# Expose port 8000 and start php-fpm server
EXPOSE 8000
CMD ["php-fpm"]
