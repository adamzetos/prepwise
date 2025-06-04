#!/bin/bash

echo "Starting deployment at $(date)"

# Navigate to project directory
cd /var/www/prepwise || exit 1

# Pull latest changes
echo "Pulling latest changes from develop branch..."
git pull origin develop

# Install dependencies
echo "Installing dependencies..."
npm install

# Build the project
echo "Building the project..."
npm run build

echo "Deployment completed at $(date)"
echo "Site available at: https://prepwise.adamchins.com"