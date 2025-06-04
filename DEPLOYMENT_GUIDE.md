# PrepWise AWS EC2 Deployment Guide

## Prerequisites Checklist
- [x] EC2 Instance: 3.94.196.29 (ec2-user)
- [x] SSH Key: adamchins-key.pem
- [x] Domain: adamchins.com (GoDaddy)
- [x] GitHub Repository: adamzetos/prepwise

## Step 1: Check/Configure EC2 Security Group

### 1.1 Check Current Security Group Settings
```bash
# SSH into your EC2 instance first
chmod 400 /Users/yonghongqin/Documents/GitHub/adamchins-key.pem
ssh -i /Users/yonghongqin/Documents/GitHub/adamchins-key.pem ec2-user@3.94.196.29

# Check if ports are open (run this on EC2)
sudo netstat -tuln | grep -E ':80|:443'
```

### 1.2 Configure Security Group in AWS Console
1. Go to AWS EC2 Console
2. Find your instance (3.94.196.29)
3. Click on Security Groups
4. Edit inbound rules and ensure these are added:
   - HTTP (Port 80) from 0.0.0.0/0
   - HTTPS (Port 443) from 0.0.0.0/0
   - SSH (Port 22) from your IP (for security)

## Step 2: Configure GoDaddy DNS

1. Log into GoDaddy DNS Management Panel
2. Add an A Record:
   - Type: A
   - Name: prepwise
   - Value: 3.94.196.29
   - TTL: 600 seconds (or default)
3. Save the record

## Step 3: Set Up EC2 Server

### 3.1 SSH into EC2 and Update System
```bash
ssh -i /Users/yonghongqin/Documents/GitHub/adamchins-key.pem ec2-user@3.94.196.29

# Update system
sudo yum update -y

# Install required packages
sudo yum install -y git nginx
sudo amazon-linux-extras install -y nginx1
```

### 3.2 Install Node.js and PM2
```bash
# Install Node.js 18.x
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install -y nodejs

# Install PM2 globally
sudo npm install -g pm2

# Verify installations
node --version
npm --version
pm2 --version
```

### 3.3 Create Web Directory
```bash
# Create directory for the app
sudo mkdir -p /var/www/prepwise
sudo chown -R ec2-user:ec2-user /var/www/prepwise
```

## Step 4: Initial Manual Deployment

### 4.1 Clone and Build the App
```bash
# Clone the repository
cd /var/www/prepwise
git clone https://github.com/adamzetos/prepwise.git .
git checkout develop

# Install dependencies
npm install

# Build the production app
npm run build

# The built files will be in the 'dist' directory
```

## Step 5: Configure Nginx

### 5.1 Create Nginx Configuration
```bash
sudo nano /etc/nginx/conf.d/prepwise.conf
```

Add this configuration:
```nginx
server {
    listen 80;
    server_name prepwise.adamchins.com;
    root /var/www/prepwise/dist;
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

### 5.2 Test and Start Nginx
```bash
# Test configuration
sudo nginx -t

# Start Nginx
sudo systemctl start nginx
sudo systemctl enable nginx

# Restart to apply changes
sudo systemctl restart nginx
```

## Step 6: Set Up SSL with Let's Encrypt

### 6.1 Install Certbot
```bash
# Install EPEL repository
sudo yum install -y epel-release

# Install Certbot
sudo yum install -y certbot python3-certbot-nginx
```

### 6.2 Obtain SSL Certificate
```bash
# Get certificate (make sure DNS is propagated first)
sudo certbot --nginx -d prepwise.adamchins.com

# Follow the prompts:
# - Enter email address
# - Agree to terms
# - Choose whether to redirect HTTP to HTTPS (recommended: yes)
```

### 6.3 Set Up Auto-Renewal
```bash
# Test renewal
sudo certbot renew --dry-run

# Add cron job for auto-renewal
echo "0 0,12 * * * root python3 -c 'import random; import time; time.sleep(random.random() * 3600)' && certbot renew -q" | sudo tee -a /etc/crontab > /dev/null
```

## Step 7: Set Up GitHub Actions for CI/CD

### 7.1 Create Deployment Script on EC2
```bash
# Create deployment script
nano /var/www/prepwise/deploy.sh
```

Add this content:
```bash
#!/bin/bash
cd /var/www/prepwise
git pull origin develop
npm install
npm run build
# Restart any services if needed
```

Make it executable:
```bash
chmod +x /var/www/prepwise/deploy.sh
```

### 7.2 Set Up SSH Key for GitHub Actions
```bash
# Generate deployment key on EC2
ssh-keygen -t rsa -b 4096 -f ~/.ssh/github_deploy -N ""

# Add to authorized_keys
cat ~/.ssh/github_deploy.pub >> ~/.ssh/authorized_keys

# Display the private key (save this for GitHub Secrets)
cat ~/.ssh/github_deploy
```

### 7.3 Create GitHub Actions Workflow

Create `.github/workflows/deploy.yml` in your repository:

```yaml
name: Deploy to AWS EC2

on:
  push:
    branches: [ develop ]
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Deploy to EC2
      uses: appleboy/ssh-action@v0.1.5
      with:
        host: ${{ secrets.EC2_HOST }}
        username: ${{ secrets.EC2_USER }}
        key: ${{ secrets.EC2_SSH_KEY }}
        script: |
          cd /var/www/prepwise
          git pull origin develop
          npm install
          npm run build
          echo "Deployment completed!"
```

### 7.4 Add GitHub Secrets

Go to your GitHub repository settings > Secrets and variables > Actions, and add:
- `EC2_HOST`: 3.94.196.29
- `EC2_USER`: ec2-user
- `EC2_SSH_KEY`: (paste the private key from step 7.2)

## Step 8: Verify Deployment

1. Check DNS propagation: https://dnschecker.org/#A/prepwise.adamchins.com
2. Visit http://prepwise.adamchins.com (should redirect to HTTPS)
3. Visit https://prepwise.adamchins.com
4. Test a push to develop branch to trigger automatic deployment

## Maintenance Commands

### View Nginx logs
```bash
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

### Restart services
```bash
sudo systemctl restart nginx
```

### Manual deployment
```bash
cd /var/www/prepwise
./deploy.sh
```

## Troubleshooting

### If site doesn't load:
1. Check Nginx status: `sudo systemctl status nginx`
2. Check Nginx error log: `sudo tail -50 /var/log/nginx/error.log`
3. Verify files exist: `ls -la /var/www/prepwise/dist`

### If SSL doesn't work:
1. Ensure DNS is propagated (can take up to 48 hours)
2. Check certificate: `sudo certbot certificates`
3. Renew manually: `sudo certbot renew`

### If GitHub Actions fails:
1. Check Actions tab in GitHub for error logs
2. Verify SSH connection: `ssh -i ~/.ssh/github_deploy ec2-user@3.94.196.29`
3. Check file permissions on EC2

## Security Recommendations

1. Set up a firewall with UFW or iptables
2. Keep system updated: `sudo yum update -y`
3. Monitor access logs regularly
4. Consider setting up fail2ban for SSH protection
5. Use environment variables for sensitive data

---

**Deployment Complete!** 🚀

Your PrepWise application should now be live at https://prepwise.adamchins.com