# Database Setup — Upstash Redis

RSVP data is stored using **Upstash Redis**, a simple key-value store available
from the Vercel Marketplace. No SQL, no tables, no schemas needed.

## Setup (3 steps, ~1 minute)

1. Open your **Vercel project dashboard**
2. Click the **Storage** tab → **Create Database** → choose **Upstash Redis** → **Create**
3. Click **Connect to Project** → select your project → **Connect**

**Important: After connecting, you must redeploy your project for the
environment variables to take effect.** Go to **Deployments** → click the
**⋮** menu on the latest deployment → **Redeploy**.

## Environment Variables

When you connect Upstash Redis, Vercel automatically adds these env vars to
your project (you do NOT need to add them manually):

```
KV_REST_API_URL=https://your-db.upstash.io
KV_REST_API_TOKEN=your-token
KV_REST_API_READ_ONLY_TOKEN=...
KV_URL=rediss://...
REDIS_URL=rediss://...
```

The API only needs `KV_REST_API_URL` and `KV_REST_API_TOKEN` — both are set
automatically.

## How it works

- RSVPs are stored as a simple JSON list in Redis
- The `/api/rsvp` serverless function handles GET/POST/DELETE
- Data persists across all deployments — it's stored externally by Upstash
- Free tier: 10,000 requests/day, 256 MB storage (way more than you need for ~20 RSVPs)

## Troubleshooting

| Problem | Fix |
|---------|-----|
| "Redis not configured" | Make sure you've **redeployed** after connecting Upstash Redis |
| Still getting errors after redeploy | Go to Vercel → Settings → Environment Variables and check `KV_REST_API_URL` and `KV_REST_API_TOKEN` are listed |
| Works locally but not in prod | Redis only works on Vercel — local dev uses localStorage fallback |
| Need to reset all data | In Vercel dashboard → Storage → your Redis DB → CLI tab → run `DEL rsvps` |
