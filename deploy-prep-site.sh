#!/bin/bash
# Deployment script for prep.adamchins.com (Beta 0.3.1)

echo "🚀 Starting deployment of prep.adamchins.com (Beta 0.3.1)..."

# Configuration
EC2_HOST="3.94.196.29"
EC2_USER="ec2-user"
SSH_KEY="/Users/yonghongqin/Documents/GitHub/adamchins-key.pem"
DOMAIN="prep.adamchins.com"
SITE_DIR="/var/www/prep"
BRANCH="preprod"  # For Beta 0.3.1

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}📋 Step 1: Setting up DNS A Record${NC}"
echo "Please add this DNS record in GoDaddy:"
echo "  Type: A"
echo "  Name: prep"
echo "  Value: $EC2_HOST"
echo "  TTL: 600"
echo ""
read -p "Press enter when DNS is configured..."

echo -e "${GREEN}✅ Step 2: Connecting to EC2 and setting up directory${NC}"
ssh -i "$SSH_KEY" "$EC2_USER@$EC2_HOST" << 'ENDSSH'
# Create directory for the new site
sudo mkdir -p /var/www/prep
sudo chown -R ec2-user:ec2-user /var/www/prep

# Clone the repository to the new location
cd /var/www/prep
if [ ! -d ".git" ]; then
    git clone https://github.com/adamzetos/prepwise.git .
fi

# Checkout Beta 0.3.1 branch
git fetch origin
git checkout preprod
git pull origin preprod

# Install dependencies and build
echo "📦 Installing dependencies..."
npm install

echo "🔨 Building the application..."
npm run build

echo "✅ Build complete!"
ENDSSH

echo -e "${GREEN}✅ Step 3: Creating Nginx configuration${NC}"
ssh -i "$SSH_KEY" "$EC2_USER@$EC2_HOST" << 'ENDSSH'
# Create Nginx configuration for prep.adamchins.com
sudo tee /etc/nginx/conf.d/prep.conf > /dev/null << 'EOF'
server {
    listen 80;
    server_name prep.adamchins.com;
    root /var/www/prep/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
EOF

# Test and reload Nginx
sudo nginx -t
sudo systemctl reload nginx
echo "✅ Nginx configured and reloaded!"
ENDSSH

echo -e "${GREEN}✅ Step 4: Setting up SSL certificate${NC}"
echo "Waiting for DNS propagation (this may take a few minutes)..."
sleep 30

ssh -i "$SSH_KEY" "$EC2_USER@$EC2_HOST" << 'ENDSSH'
# Get SSL certificate
sudo certbot --nginx -d prep.adamchins.com --non-interactive --agree-tos --email adamzetos@gmail.com --redirect
echo "✅ SSL certificate obtained!"
ENDSSH

echo -e "${GREEN}✅ Step 5: Creating deployment script on server${NC}"
ssh -i "$SSH_KEY" "$EC2_USER@$EC2_HOST" << 'ENDSSH'
# Create deployment script for future updates
cat > /var/www/prep/deploy.sh << 'EOF'
#!/bin/bash
cd /var/www/prep
git pull origin preprod
npm install
npm run build
echo "Deployment completed for prep.adamchins.com!"
EOF

chmod +x /var/www/prep/deploy.sh
echo "✅ Deployment script created!"
ENDSSH

echo -e "${GREEN}🎉 Deployment Complete!${NC}"
echo ""
echo "Your sites are now:"
echo "  - Beta 0.2 (Production): https://prepwise.adamchins.com"
echo "  - Beta 0.3.1 (Staging): https://prep.adamchins.com"
echo ""
echo "To update prep.adamchins.com in the future:"
echo "  ssh -i $SSH_KEY $EC2_USER@$EC2_HOST"
echo "  cd /var/www/prep && ./deploy.sh"