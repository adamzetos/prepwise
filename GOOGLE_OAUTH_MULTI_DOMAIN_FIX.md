# Google OAuth Multi-Domain Configuration

## Problem
Google SSO error: `400: redirect_uri_mismatch` when accessing from prep.adamchins.com

## Solution Steps

### 1. Update Google Cloud Console

1. Go to: https://console.cloud.google.com/
2. Navigate to: **APIs & Services** → **Credentials**
3. Click on your OAuth 2.0 Client ID

### 2. Add These Authorized Redirect URIs

```
# For production site (existing)
https://prepwise.adamchins.com
https://prepwise.adamchins.com/
https://prepwise.adamchins.com/login
https://prepwise.adamchins.com/dashboard

# For staging site (new - add these)
https://prep.adamchins.com
https://prep.adamchins.com/
https://prep.adamchins.com/login
https://prep.adamchins.com/dashboard

# For local development (if needed)
http://localhost:5173
http://localhost:5173/login
http://localhost:5173/dashboard
```

### 3. Add Authorized JavaScript Origins

```
# Production
https://prepwise.adamchins.com

# Staging (add this)
https://prep.adamchins.com

# Local development
http://localhost:5173
```

### 4. Save and Wait

- Click **Save**
- Changes may take 5-10 minutes to propagate

### 5. Verify Configuration

After saving, your OAuth client should have:
- Multiple authorized redirect URIs for both domains
- Multiple JavaScript origins for both domains

## Alternative Solution: Separate OAuth Apps

If you prefer cleaner separation, create a second OAuth app:

1. In Google Cloud Console, create new OAuth 2.0 Client ID
2. Name it "PrepWise Staging" or similar
3. Configure with prep.adamchins.com URLs only
4. Update your .env on prep site:
   ```
   VITE_GOOGLE_CLIENT_ID=your-new-staging-client-id
   ```

## Testing

1. Clear browser cache/cookies
2. Try logging in at https://prep.adamchins.com
3. Should redirect to Google and back successfully

## Common Issues

### Still getting redirect_uri_mismatch?
- Check exact URL in browser during error
- Ensure no trailing slashes mismatch
- Verify HTTPS (not HTTP)
- Wait full 10 minutes for propagation

### Different error?
- Check browser console for details
- Verify .env file has correct CLIENT_ID
- Ensure Google OAuth app is not in test mode with user restrictions