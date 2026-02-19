# Database Setup Guide

Your RSVP data is stored in a free **Supabase** database (PostgreSQL).

## Quick Setup

**Visit your deployed site at `/api/setup`** — it will walk you through everything
step-by-step and tell you exactly what to do.

The setup wizard checks your progress automatically:
- ✅ or ❌ — environment variables configured
- ✅ or ❌ — database table created

## Manual Steps (if you prefer)

### 1. Create a free Supabase project

1. Go to [supabase.com](https://supabase.com) and sign up (GitHub login works)
2. Click **New Project**, pick any name and region, then wait ~2 minutes

### 2. Add environment variables to Vercel

From your Supabase project go to **Settings → API** and copy:
- **Project URL** → add as `SUPABASE_URL` in Vercel
- **service_role key** → add as `SUPABASE_SERVICE_ROLE_KEY` in Vercel

Then **redeploy** your Vercel project so it picks up the new variables.

### 3. Create the RSVP table

Visit `/api/setup` on your deployed site. It will give you a **Copy SQL**
button and a direct link to your Supabase SQL Editor. Paste the SQL and
press **Run** — that's it.

### 4. Test it

- Submit an RSVP on your site
- View it on `/admin`

## Troubleshooting

| Problem | Fix |
|---------|-----|
| "Missing SUPABASE_URL…" | Add the env vars in Vercel and redeploy |
| "Database table not set up" | Visit `/api/setup` and follow Step 2 |
| Data disappears on redeploy | This shouldn't happen — Supabase data is persistent |
