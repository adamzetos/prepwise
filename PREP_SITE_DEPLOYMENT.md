# Deploy prep.adamchins.com (Beta 0.3.1) - Manual Steps

## Overview
This guide will help you deploy Beta 0.3.1 to prep.adamchins.com while keeping Beta 0.2 running at prepwise.adamchins.com.

## Step 1: Configure DNS (GoDaddy)

1. Log into GoDaddy DNS Management
2. Add new A Record:
   - **Type**: A
   - **Name**: prep
   - **Value**: 3.94.196.29
   - **TTL**: 600 seconds

## Step 2: SSH into EC2 and Set Up Directory

```bash
# SSH into your EC2
ssh -i /Users/yonghongqin/Documents/GitHub/adamchins-key.pem ec2-user@3.94.196.29

# Create directory for new site
sudo mkdir -p /var/www/prep
sudo chown -R ec2-user:ec2-user /var/www/prep

# Clone repository
cd /var/www/prep
git clone https://github.com/adamzetos/prepwise.git .

# Checkout Beta 0.3.1 (preprod branch)
git checkout preprod
git pull origin preprod

# Create .env file if needed
echo "VITE_OPENAI_API_KEY=your-openai-key-here" > .env
echo "VITE_GOOGLE_CLIENT_ID=your-google-client-id" >> .env

# Install and build
npm install
npm run build
```

## Step 3: Configure Nginx

```bash
# Create Nginx config for prep.adamchins.com
sudo nano /etc/nginx/conf.d/prep.conf
```

Add this configuration:
```nginx
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
```

```bash
# Test and reload Nginx
sudo nginx -t
sudo systemctl reload nginx
```

## Step 4: Set Up SSL Certificate

```bash
# Wait for DNS to propagate (check with: nslookup prep.adamchins.com)
# Then get SSL certificate
sudo certbot --nginx -d prep.adamchins.com

# Follow prompts:
# - Enter email
# - Agree to terms
# - Choose to redirect HTTP to HTTPS (recommended)
```

## Step 5: Create Update Script

```bash
# Create deployment script for easy updates
nano /var/www/prep/deploy.sh
```

Add:
```bash
#!/bin/bash
cd /var/www/prep
git pull origin preprod
npm install
npm run build
echo "prep.adamchins.com updated!"
```

```bash
chmod +x /var/www/prep/deploy.sh
```

## Step 6: Verify Both Sites

1. **Beta 0.2 (Production)**: https://prepwise.adamchins.com
2. **Beta 0.3.1 (Staging)**: https://prep.adamchins.com

## Quick Commands Reference

### Check both sites status:
```bash
# On EC2
ls -la /var/www/prepwise/dist  # Beta 0.2
ls -la /var/www/prep/dist      # Beta 0.3.1

# Check Nginx configs
cat /etc/nginx/conf.d/prepwise.conf  # Beta 0.2
cat /etc/nginx/conf.d/prep.conf      # Beta 0.3.1
```

### Update Beta 0.3.1 site:
```bash
ssh -i /Users/yonghongqin/Documents/GitHub/adamchins-key.pem ec2-user@3.94.196.29
cd /var/www/prep && ./deploy.sh
```

### Switch versions if needed:
```bash
# To update prep site to latest preprod
cd /var/www/prep
git pull origin preprod
npm install && npm run build

# To deploy specific tag
cd /var/www/prep
git fetch --tags
git checkout Beta-0.3.1
npm install && npm run build
```

## Rollback Strategy

If Beta 0.3.1 has issues and you want to make prep.adamchins.com identical to production:
```bash
cd /var/www/prep
git checkout Production-Beta-0.2
npm install && npm run build
```

## Benefits of This Setup

1. **Zero Downtime**: Production site remains untouched
2. **A/B Testing**: Compare both versions side by side
3. **Safe Rollback**: If Beta 0.3.1 has issues, production is unaffected
4. **Staging Environment**: Test Beta 0.3.1 thoroughly before production
5. **Easy Switch**: When ready, just update production site's git branch

## Next Steps

After both sites are running, you can:
1. Test Beta 0.3.1 thoroughly at prep.adamchins.com
2. Share the prep URL with testers
3. When satisfied, deploy to production by updating prepwise.adamchins.com
4. Keep prep.adamchins.com as a permanent staging environment