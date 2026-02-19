// Serverless function for RSVP submission with Supabase database
import { createClient } from '@supabase/supabase-js'

function getSupabase() {
  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error(
      'Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables. ' +
      'Please set them in your Vercel project settings.'
    )
  }
  return createClient(supabaseUrl, supabaseServiceKey)
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

  let supabase
  try {
    supabase = getSupabase()
  } catch (error) {
    console.error('Supabase init error:', error.message)
    return res.status(500).json({ error: error.message })
  }

  if (req.method === 'GET') {
    try {
      const { data, error } = await supabase
        .from('rsvps')
        .select('*')
        .order('submitted_at', { ascending: false })

      if (error) throw error

      const responses = (data || []).map(item => ({
        name: item.name,
        attending: item.attending,
        submittedAt: item.submitted_at
      }))

      return res.status(200).json({ responses })
    } catch (error) {
      console.error('Supabase GET error:', error)
      return res.status(500).json({ error: 'Failed to fetch RSVPs' })
    }
  }

  if (req.method === 'DELETE') {
    try {
      const { index } = req.body

      // First get all RSVPs to find the one to delete
      const { data: allRsvps, error: fetchError } = await supabase
        .from('rsvps')
        .select('*')
        .order('submitted_at', { ascending: false })

      if (fetchError) throw fetchError

      if (index < 0 || index >= allRsvps.length) {
        return res.status(400).json({ error: 'Invalid RSVP index' })
      }

      // Delete the specific RSVP
      const rsvpToDelete = allRsvps[index]
      const { error: deleteError } = await supabase
        .from('rsvps')
        .delete()
        .eq('id', rsvpToDelete.id)

      if (deleteError) throw deleteError

      return res.status(200).json({
        success: true,
        message: `RSVP for ${rsvpToDelete.name} deleted successfully`
      })
    } catch (error) {
      console.error('Supabase DELETE error:', error)
      return res.status(500).json({ error: 'Failed to delete RSVP' })
    }
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { name, attending } = req.body

    // Validate required fields
    if (!name || !attending) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    // Store the RSVP response in Supabase
    const { data: newRSVP, error } = await supabase
      .from('rsvps')
      .insert({ name, attending })
      .select()
      .single()

    if (error) throw error

    // Transform response to match expected format
    const newResponse = {
      name: newRSVP.name,
      attending: newRSVP.attending,
      submittedAt: newRSVP.submitted_at
    }

    // Log RSVP for monitoring
    console.log('New RSVP:', {
      name,
      attending: attending === 'yes' ? 'Yes' : 'No',
      submitted: new Date().toLocaleString()
    })

    // Success response
    return res.status(200).json({
      success: true,
      message: 'RSVP submitted successfully',
      response: newResponse
    })

  } catch (error) {
    console.error('RSVP submission error:', error)
    return res.status(500).json({
      error: 'Failed to submit RSVP'
    })
  }
}
