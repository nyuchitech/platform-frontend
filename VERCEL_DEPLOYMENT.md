# 🚀 Vercel Deployment Guide - Nyuchi Africa Platform

## Quick Setup

### 1. **Login to Vercel**
```bash
npx vercel login
```

### 2. **Connect Project**
```bash
npx vercel --confirm
```

### 3. **Deploy**
```bash
# Preview deployment
npm run vercel:preview

# Production deployment  
npm run vercel:deploy
```

## Custom Domain Setup

### 1. **Add Custom Domain in Vercel Dashboard**
- Go to Project Settings → Domains
- Add `platform.nyuchi.com`

### 2. **DNS Configuration**
Point your domain to Vercel:
```
Type: CNAME
Name: platform
Value: cname.vercel-dns.com
```

## Environment Variables

Set these in Vercel Dashboard → Project Settings → Environment Variables:

### Production
```
VITE_APP_URL=https://platform.nyuchi.com
VITE_UBUNTU_PHILOSOPHY=I am because we are
VITE_COMMUNITY_ALWAYS_FREE=true
VITE_THEME_PRIMARY_COLOR=#00A651
VITE_THEME_SECONDARY_COLOR=#FDD116
VITE_THEME_ACCENT_COLOR=#EF3340
VITE_UBUNTU_ORANGE=#E95420
```

### API Integration
```
VITE_API_DISPATCHER_URL=https://nyuchi-africa-dispatcher.nyuchitech.workers.dev
VITE_API_COMMUNITY_URL=https://nyuchi-africa-community.nyuchitech.workers.dev
VITE_API_TRAVEL_URL=https://nyuchi-africa-travel.nyuchitech.workers.dev
```

## GitHub Actions Secrets

Add these secrets in GitHub Repository → Settings → Secrets and Variables → Actions:

```
VERCEL_TOKEN=your_vercel_token_here
VERCEL_ORG_ID=your_org_id_here  
VERCEL_PROJECT_ID=your_project_id_here
```

### Getting Vercel Credentials:
1. **VERCEL_TOKEN**: Vercel Dashboard → Account Settings → Tokens → Create
2. **VERCEL_ORG_ID**: Run `vercel teams list` or check Vercel project settings
3. **VERCEL_PROJECT_ID**: Check Vercel project settings or `.vercel/project.json`

## Deployment Process

### Automatic (Recommended)
1. Push to `main` branch
2. GitHub Actions triggers build & deploy
3. Ubuntu compliance validation runs
4. Deploys to `platform.nyuchi.com`

### Manual
```bash
# Build and test locally
npm run build
npm run preview

# Deploy to preview
npm run vercel:preview

# Deploy to production
npm run vercel:deploy
```

## Ubuntu Compliance Headers

Automatically added to all responses:
- `X-Ubuntu-Philosophy: I am because we are`
- `X-Platform-Identity: Nyuchi Africa Platform - Zimbabwe 🇿🇼`

## Monitoring

### Vercel Dashboard
- Performance metrics
- Function logs
- Real-time analytics

### Ubuntu Philosophy Validation
- Automated checks for Zimbabwe theme colors
- Community features validation
- Ubuntu principle compliance

## Troubleshooting

### Build Issues
```bash
# Local build test
npm run build

# Check build output
ls -la build/client
ls -la build/server
```

### Deployment Issues
```bash
# Check Vercel logs
npx vercel logs

# Inspect functions
npx vercel inspect
```

### Domain Issues
- Ensure DNS propagation (24-48 hours)
- Check domain verification in Vercel Dashboard
- Verify CNAME record points to `cname.vercel-dns.com`

## Success Metrics

✅ **Performance**: < 2s load time  
✅ **Uptime**: 99.9% availability  
✅ **Ubuntu Compliance**: Community features always accessible  
✅ **Zimbabwe Identity**: Flag colors preserved in theming  

---

**🇿🇼 Ubuntu Philosophy**: "I am because we are" - Community success through individual success.