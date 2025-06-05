# Google OAuth Setup Instructions for PrepWise

## Prerequisites
- A Google account
- Access to Google Cloud Console

## Step-by-Step Setup Guide

### 1. Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click on the project dropdown (top left)
3. Click "New Project"
4. Enter project name: "PrepWise"
5. Click "Create"

### 2. Enable Google+ API

1. In the Google Cloud Console, go to "APIs & Services" > "Library"
2. Search for "Google+ API" or "Google Identity"
3. Click on "Google+ API"
4. Click "Enable"

### 3. Create OAuth 2.0 Credentials

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth client ID"
3. If prompted, configure OAuth consent screen first:
   - Choose "External" user type
   - Click "Create"

### 4. Configure OAuth Consent Screen

1. **App Information:**
   - App name: PrepWise
   - User support email: [your email]
   - App logo: Upload the PrepWise logo if desired

2. **App Domain:**
   - Application home page: https://prepwise.adamchins.com
   - Application privacy policy: https://prepwise.adamchins.com/privacy (or leave blank)
   - Application terms of service: https://prepwise.adamchins.com/terms (or leave blank)

3. **Authorized domains:**
   - Add: meeriad.com
   - Add: zetos.fr
   - Add: adamchins.com

4. **Developer contact information:**
   - Add your email addresses

5. Click "Save and Continue"

### 5. Add Scopes

1. Click "Add or Remove Scopes"
2. Select these scopes:
   - .../auth/userinfo.email
   - .../auth/userinfo.profile
   - openid
3. Click "Update"
4. Click "Save and Continue"

### 6. Add Test Users (Optional for Development)

1. Add test email addresses if needed
2. Click "Save and Continue"

### 7. Create OAuth Client ID

1. Go back to "Credentials"
2. Click "Create Credentials" > "OAuth client ID"
3. Application type: "Web application"
4. Name: "PrepWise Web Client"

### 8. Configure Authorized JavaScript Origins

Add ALL of these origins:
```
http://localhost:5173
http://localhost:5174
http://localhost:3000
https://prepwise.adamchins.com
https://prepwise.meeriad.com
https://prepwise.zetos.fr
```

### 9. Configure Authorized Redirect URIs

Add ALL of these URIs:
```
http://localhost:5173
http://localhost:5173/login
http://localhost:5174
http://localhost:5174/login
http://localhost:3000
http://localhost:3000/login
https://prepwise.adamchins.com
https://prepwise.adamchins.com/login
https://prepwise.meeriad.com
https://prepwise.meeriad.com/login
https://prepwise.zetos.fr
https://prepwise.zetos.fr/login
```

### 10. Save and Get Your Client ID

1. Click "Create"
2. A popup will show your credentials:
   - **Client ID**: Copy this (looks like: xxxxx.apps.googleusercontent.com)
   - **Client Secret**: We don't need this for frontend-only auth

### 11. Add Client ID to PrepWise

1. Create/update your `.env` file:
```bash
VITE_GOOGLE_CLIENT_ID=your-client-id-here.apps.googleusercontent.com
```

2. For production deployment, add this to your server's environment variables

## Important Notes

1. **Development vs Production:**
   - For development, the OAuth will work immediately
   - For production domains, Google may require verification

2. **Domain Verification:**
   - You may need to verify domain ownership for custom domains
   - This is done through Google Search Console

3. **Publishing Status:**
   - Keep app in "Testing" mode for development
   - Submit for verification when ready for production

4. **Rate Limits:**
   - Testing mode: 100 users max
   - Production: Requires app verification

## Troubleshooting

### Common Issues:

1. **"redirect_uri_mismatch" error:**
   - Ensure the exact URL is in your authorized redirect URIs
   - Check for trailing slashes
   - Verify protocol (http vs https)

2. **"Invalid origin" error:**
   - Add the origin to authorized JavaScript origins
   - Clear browser cache

3. **"App not verified" warning:**
   - Normal for testing mode
   - Users can click "Advanced" > "Go to PrepWise (unsafe)" during testing

## Next Steps

After completing this setup:
1. Copy your Client ID
2. Update your .env file
3. The PrepWise code will handle the rest!

---

Need help? Check the [Google OAuth 2.0 documentation](https://developers.google.com/identity/protocols/oauth2)