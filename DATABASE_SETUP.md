# Database Setup — Upstash Redis

RSVP data is stored using **Upstash Redis**, a simple key-value store available
from the Vercel Marketplace. No SQL, no tables, no schemas, no external
accounts needed.

## Setup (3 steps, ~1 minute)

1. Open your **Vercel project dashboard**
2. Click the **Storage** tab → **Create Database** → choose **Upstash Redis** → **Create**
3. Click **Connect to Project** → select your project → **Connect**

That's it. Redeploy and your RSVP form + admin page will work.

## How it works

- RSVPs are stored as a simple JSON list in Redis
- The `/api/rsvp` serverless function handles GET/POST/DELETE
- Data persists across all deployments — it's stored externally by Upstash
- Free tier: 10,000 requests/day, 256 MB storage (way more than you need for ~20 RSVPs)

## Troubleshooting

| Problem | Fix |
|---------|-----|
| "Redis not configured" | Make sure Upstash Redis is connected (Storage tab in Vercel) and redeploy |
| Works locally but not in prod | Redis only works on Vercel — local dev uses localStorage fallback |
| Need to reset all data | In Vercel dashboard → Storage → your Redis DB → CLI tab → run `DEL rsvps` |
