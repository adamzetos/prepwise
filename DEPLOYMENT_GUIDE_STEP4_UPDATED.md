# Step 4: Clone and Build the App (Updated for Master Branch)

Since we've fixed the TypeScript errors and pushed to master branch, here are the updated commands for your EC2 server:

## 4.1 Navigate to the Project Directory
```bash
cd /var/www/prepwise
```

## 4.2 Discard Local Changes and Clean Up
Since we made some corrupted changes earlier with sed, let's clean up first:
```bash
# Remove any local changes
git checkout -- .
git clean -fd

# Check current branch
git branch
```

## 4.3 Switch to Master Branch for Production
```bash
# Fetch latest changes from remote
git fetch origin

# Switch to master branch (for production)
git checkout master

# Pull latest changes from master
git pull origin master
```

## 4.4 Install Dependencies
```bash
# Install/update dependencies
npm install
```

## 4.5 Build the Production App
```bash
# Build the app (this should work now without TypeScript errors)
npm run build

# Verify the build succeeded
ls -la dist/
```

You should see output like:
```
dist/
├── assets/
│   ├── index-*.js
│   ├── index-*.css
│   └── other bundled files
├── icons/
│   └── (all your icon files)
└── index.html
```

## 4.6 Update Deploy Script for Master Branch
```bash
# Update the deploy script to use master branch
nano /var/www/prepwise/deploy.sh
```

Change the line:
```bash
git pull origin develop
```

To:
```bash
git pull origin master
```

Save and exit (Ctrl+X, Y, Enter).

## Important Notes:
- **Always use `master` branch for production deployment**
- The `develop` branch is for active development
- The `preprod` branch is for pre-production testing
- Only tested and stable code should be in `master`

## Next Steps:
Once the build completes successfully, proceed to:
- Step 5: Configure Nginx
- Step 6: Set up SSL certificate

The built files in the `dist/` directory will be served by Nginx.