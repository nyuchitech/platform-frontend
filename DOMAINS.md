# Nyuchi Platform Domain Architecture

This document describes the domain configuration for the Nyuchi platform.

## Production Domains

| Domain | Service | Hosting | Purpose |
|--------|---------|---------|---------|
| `platform.nyuchi.com` | Next.js Web App | Vercel | Main platform frontend |
| `api.nyuchi.com` | Hono API (Cloudflare Worker) | Cloudflare | Backend API |
| `www.nyuchi.com` | Marketing Site | Vercel (separate project) | Marketing/landing page |
| `community-assets.nyuchi.com` | R2 Bucket | Cloudflare | Community assets (images, files) |
| `media.nyuchi.com` | R2 Bucket | Cloudflare | Media uploads |

## Third-Party Services

| Service | URL | Purpose |
|---------|-----|---------|
| Supabase | `https://aqjhuyqhgmmdutwzqvyv.supabase.co` | Database & Auth |
| Cloudflare AI Gateway | `gateway.ai.cloudflare.com` | AI/LLM requests |

## Development URLs

| URL | Service |
|-----|---------|
| `http://localhost:3000` | Next.js dev server |
| `http://localhost:8787` | Cloudflare Worker (wrangler dev) |
| `http://localhost:5173` | Vite dev server |
| `http://127.0.0.1:54321` | Local Supabase |
| `http://127.0.0.1:54323` | Local Supabase Studio |

## Project Structure

### 1. Platform App (This Repo)
- **Domain**: `platform.nyuchi.com`
- **Source**: `apps/platform/`
- **Framework**: Next.js
- **Hosting**: Vercel
- **Root Directory**: `apps/platform`

### 2. API (This Repo)
- **Domain**: `api.nyuchi.com`
- **Source**: `cloudflare/`
- **Framework**: Cloudflare Workers (Hono)
- **Hosting**: Cloudflare
- **Deployment**: `wrangler deploy --env production`

### 3. Marketing Site (Separate Repo)
- **Domain**: `www.nyuchi.com`
- **Source**: Separate repository
- **Framework**: Next.js (or other)
- **Hosting**: Vercel (separate project)

## Environment Variables

### Frontend (Vercel - `apps/platform`)

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://aqjhuyqhgmmdutwzqvyv.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-publishable-key>

# API
NEXT_PUBLIC_API_URL=https://api.nyuchi.com
```

### Backend (Cloudflare - `cloudflare/`)

Set these as Cloudflare Worker secrets:

```bash
wrangler secret put SUPABASE_URL
wrangler secret put SUPABASE_ANON_KEY
wrangler secret put SUPABASE_SERVICE_ROLE_KEY
wrangler secret put STRIPE_SECRET_KEY
wrangler secret put STRIPE_WEBHOOK_SECRET
wrangler secret put CLOUDFLARE_AI_GATEWAY_ENDPOINT
```

## CORS Configuration

The API (`api.nyuchi.com`) allows requests from:

- `https://platform.nyuchi.com` - Main frontend
- `https://nyuchi.com` - Base domain
- `https://www.nyuchi.com` - Marketing site
- `http://localhost:5173` - Vite dev
- `http://localhost:3000` - Next.js dev

Configured in: `cloudflare/src/index.ts`

## Cloudflare R2 Setup

### Creating Custom Domains for R2 Buckets

1. Create R2 buckets in Cloudflare dashboard
2. Enable public access for each bucket
3. Add custom domain in bucket settings:
   - `community-assets.nyuchi.com` -> community assets bucket
   - `media.nyuchi.com` -> media bucket
4. Cloudflare will automatically provision SSL

### Image Configuration (Next.js)

The `next.config.js` includes remote patterns for:
- `community-assets.nyuchi.com`
- `media.nyuchi.com`
- `aqjhuyqhgmmdutwzqvyv.supabase.co/storage`

## DNS Configuration

Ensure the following DNS records are configured in Cloudflare:

| Type | Name | Content | Proxy |
|------|------|---------|-------|
| CNAME | platform | cname.vercel-dns.com | Off |
| CNAME | api | (Worker route) | On |
| CNAME | www | (Marketing host) | On |
| CNAME | community-assets | (R2 bucket) | On |
| CNAME | media | (R2 bucket) | On |

## Deployment Checklist

- [ ] Deploy `apps/platform` to Vercel with `platform.nyuchi.com` domain
- [ ] Deploy `cloudflare/` to Cloudflare with `api.nyuchi.com` route
- [ ] Configure R2 buckets with custom domains
- [ ] Set all environment variables/secrets
- [ ] Configure DNS records
- [ ] Test CORS from frontend to API
- [ ] Verify image loading from R2 buckets
