# PrepWise Preprod CI/CD Guide

## Overview

This guide explains the CI/CD pipeline for prep.adamchins.com (preprod/staging environment).

## Deployment Triggers

The CI/CD will automatically deploy to prep.adamchins.com when:

1. **Push to preprod branch**
   ```bash
   git push origin preprod
   ```

2. **Create and push a tag** (starting with `Beta-` or `v`)
   ```bash
   git tag -a "Beta-0.3.2" -m "Release message"
   git push origin Beta-0.3.2
   ```

3. **Manual trigger** from GitHub Actions UI
   - Go to Actions tab
   - Select "Deploy Preprod to prep.adamchins.com"
   - Click "Run workflow"
   - Optionally specify a tag to deploy

## How It Works

### Automatic Deployment Flow

1. **Merge to preprod**:
   ```bash
   git checkout preprod
   git merge develop
   git push origin preprod
   ```
   → Automatically deploys latest preprod to prep.adamchins.com

2. **Tag deployment**:
   ```bash
   git tag -a "Beta-0.3.2" -m "New features"
   git push origin Beta-0.3.2
   ```
   → Automatically deploys that specific tag to prep.adamchins.com

### What Happens During Deployment

1. GitHub Actions connects to EC2 via SSH
2. Changes to `/var/www/prep` directory
3. Pulls latest code (branch or tag)
4. Runs `npm install`
5. Runs `npm run build`
6. New version is live at https://prep.adamchins.com

## Common Scenarios

### Deploy Latest Development Work
```bash
# On your local machine
git checkout develop
git pull origin develop

# Merge to preprod
git checkout preprod
git merge develop
git push origin preprod

# CI/CD automatically deploys to prep.adamchins.com
```

### Deploy a Specific Release
```bash
# Create and push a tag
git checkout preprod
git tag -a "Beta-0.4.0" -m "Major update with new features"
git push origin Beta-0.4.0

# This tag is now deployed to prep.adamchins.com
```

### Rollback to Previous Version
```bash
# Option 1: Deploy a previous tag via GitHub UI
# Go to Actions → Run workflow → Enter tag name

# Option 2: Push an older tag
git push origin Beta-0.3.1

# Option 3: Reset preprod branch
git checkout preprod
git reset --hard Beta-0.3.1
git push --force origin preprod
```

## Current Setup Summary

| Environment | URL | Branch | Directory | Trigger |
|------------|-----|--------|-----------|---------|
| Production | prepwise.adamchins.com | master | /var/www/prepwise | Push to master |
| Staging | prep.adamchins.com | preprod | /var/www/prep | Push to preprod or tags |

## Monitoring Deployments

1. **Check GitHub Actions**:
   - Go to repository → Actions tab
   - Look for "Deploy Preprod to prep.adamchins.com"
   - Green checkmark = successful deployment

2. **Verify on server**:
   ```bash
   ssh -i adamchins-key.pem ec2-user@3.94.196.29
   cd /var/www/prep
   git log -1  # Check current commit
   ```

3. **Check the live site**:
   - Visit https://prep.adamchins.com
   - Check footer for version number

## Troubleshooting

### Deployment Failed?

1. **Check GitHub Actions logs**:
   - Click on the failed workflow run
   - Expand the "Deploy to prep.adamchins.com" step
   - Look for error messages

2. **Common issues**:
   - **npm install failed**: Check package.json for errors
   - **Build failed**: Check for TypeScript errors
   - **Git errors**: Ensure tag/branch exists

3. **Manual deployment** (if CI/CD fails):
   ```bash
   ssh -i adamchins-key.pem ec2-user@3.94.196.29
   cd /var/www/prep
   git pull origin preprod
   npm install
   npm run build
   ```

## Best Practices

1. **Test locally first**:
   ```bash
   npm run build
   npm run preview
   ```

2. **Use semantic versioning for tags**:
   - `Beta-0.3.1` → Bug fixes
   - `Beta-0.4.0` → New features
   - `Beta-1.0.0` → Major release

3. **Write clear tag messages**:
   ```bash
   git tag -a "Beta-0.3.2" -m "Fix: Navigation routing issues
   - Update Logo link for logged-in users
   - Fix logout redirect
   - Update version display"
   ```

4. **Always verify after deployment**:
   - Check prep.adamchins.com loads
   - Test new features
   - Verify version number in footer

## Security Notes

- SSH keys are stored as GitHub Secrets
- Only repository admins can modify workflows
- Deployments are logged in GitHub Actions

---

Ready to deploy? Just push to preprod or create a tag! 🚀