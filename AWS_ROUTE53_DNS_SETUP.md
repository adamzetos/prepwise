# AWS Route 53 DNS Setup for prepwise.adamchins.com

Since your domain is managed by AWS Amplify, you need to add the subdomain in AWS Route 53, not GoDaddy.

## Option 1: Add Subdomain in Route 53 (Recommended)

### Step 1: Access Route 53
1. Log into AWS Console
2. Go to Route 53 service
3. Click on "Hosted zones"
4. Find and click on "adamchins.com"

### Step 2: Create A Record for Subdomain
1. Click "Create record"
2. Fill in:
   - **Record name**: `prepwise` (this creates prepwise.adamchins.com)
   - **Record type**: A
   - **Value**: `3.94.196.29`
   - **TTL**: 300 (or leave default)
   - **Routing policy**: Simple routing
3. Click "Create records"

This will NOT impact your main adamchins.com or www.adamchins.com websites.

## Option 2: Check Amplify Console

Sometimes Amplify manages the entire domain. To check:

1. Go to AWS Amplify Console
2. Select your adamchins.com app
3. Go to "Domain management"
4. Check if you can add subdomains there

If Amplify is managing it, you might see an option to:
- Add subdomain
- Or manage domain settings

## Option 3: Use a Different Subdomain Approach

If the above doesn't work, you can:

1. Create a new hosted zone in Route 53 for the subdomain
2. Or use a CNAME record pointing to your EC2's public DNS

## Verify DNS Propagation

After adding the record, verify it's working:

```bash
# Check DNS resolution (may take 5-30 minutes)
nslookup prepwise.adamchins.com
dig prepwise.adamchins.com

# Or use online tool
# https://dnschecker.org/#A/prepwise.adamchins.com
```

## Important Notes

- Your main website (adamchins.com and www.adamchins.com) will NOT be affected
- Only the subdomain prepwise.adamchins.com will point to your EC2
- DNS changes can take up to 48 hours to propagate globally (usually much faster)
- Make sure you're in the correct AWS region when checking Route 53

## If You Don't See Your Domain in Route 53

This means Amplify is managing DNS internally. In this case:

1. Check Amplify Console → Domain Management
2. Look for "Manage subdomains" or similar option
3. If not available, you may need to:
   - Transfer DNS management to Route 53, or
   - Use a different subdomain strategy

## Alternative: Using EC2 Public DNS Directly

While waiting for DNS setup, you can test your deployment using:
- http://ec2-3-94-196-29.compute-1.amazonaws.com

This allows you to proceed with nginx setup and testing.