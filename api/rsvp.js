// Serverless function for RSVP submission with Upstash Redis
// No SQL, no tables, no schemas — just simple key-value storage
import { Redis } from '@upstash/redis'

const RSVP_KEY = 'rsvps'

function getRedis() {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN

  if (!url || !token) {
    throw new Error(
      'Redis not configured. Add Upstash Redis from the Vercel Marketplace ' +
      '(see DATABASE_SETUP.md for 3-step instructions).'
    )
  }
  return new Redis({ url, token })
}

async function getRsvps(redis) {
  return (await redis.get(RSVP_KEY)) || []
}

async function setRsvps(redis, rsvps) {
  await redis.set(RSVP_KEY, rsvps)
}

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  let redis
  try {
    redis = getRedis()
  } catch (error) {
    console.error('Redis init error:', error.message)
    return res.status(500).json({ error: error.message })
  }

  if (req.method === 'GET') {
    try {
      const rsvps = await getRsvps(redis)
      return res.status(200).json({ responses: rsvps })
    } catch (error) {
      console.error('Redis GET error:', error)
      return res.status(500).json({ error: 'Failed to fetch RSVPs. Make sure Upstash Redis is connected (see DATABASE_SETUP.md).' })
    }
  }

  if (req.method === 'DELETE') {
    try {
      const { index } = req.body
      const rsvps = await getRsvps(redis)

      if (index < 0 || index >= rsvps.length) {
        return res.status(400).json({ error: 'Invalid RSVP index' })
      }

      const deleted = rsvps.splice(index, 1)[0]
      await setRsvps(redis, rsvps)

      return res.status(200).json({
        success: true,
        message: `RSVP for ${deleted.name} deleted successfully`
      })
    } catch (error) {
      console.error('Redis DELETE error:', error)
      return res.status(500).json({ error: 'Failed to delete RSVP' })
    }
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { name, attending } = req.body

    if (!name || !attending) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    const newResponse = {
      name,
      attending,
      submittedAt: new Date().toISOString()
    }

    const rsvps = await getRsvps(redis)
    rsvps.unshift(newResponse) // newest first
    await setRsvps(redis, rsvps)

    console.log('New RSVP:', { name, attending, submitted: newResponse.submittedAt })

    return res.status(200).json({
      success: true,
      message: 'RSVP submitted successfully',
      response: newResponse
    })
  } catch (error) {
    console.error('RSVP submission error:', error)
    return res.status(500).json({ error: 'Failed to submit RSVP' })
  }
}
