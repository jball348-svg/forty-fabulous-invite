// Serverless function for RSVP submission with Prisma database
import { prisma } from '../lib/prisma.js'

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method === 'GET') {
    try {
      // Get all RSVP responses from Prisma
      const rsvps = await prisma.rSVP.findMany({
        orderBy: {
          submittedAt: 'desc'
        }
      })

      // Transform data to match expected format
      const responses = rsvps.map(item => ({
        name: item.name,
        attending: item.attending,
        submittedAt: item.submittedAt.toISOString()
      }))

      return res.status(200).json({ responses })
    } catch (error) {
      console.error('Prisma GET error:', error)
      return res.status(500).json({ error: 'Failed to fetch RSVPs' })
    }
  }

  if (req.method === 'DELETE') {
    try {
      const { index } = req.body

      // First get all RSVPs to find the one to delete
      const allRsvps = await prisma.rSVP.findMany({
        orderBy: {
          submittedAt: 'desc'
        }
      })

      if (index < 0 || index >= allRsvps.length) {
        return res.status(400).json({ error: 'Invalid RSVP index' })
      }

      // Delete the specific RSVP
      const rsvpToDelete = allRsvps[index]
      await prisma.rSVP.delete({
        where: {
          id: rsvpToDelete.id
        }
      })

      return res.status(200).json({ 
        success: true, 
        message: `RSVP for ${rsvpToDelete.name} deleted successfully`
      })
    } catch (error) {
      console.error('Prisma DELETE error:', error)
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

    // Store the RSVP response in Prisma
    const newRSVP = await prisma.rSVP.create({
      data: {
        name,
        attending,
        submittedAt: new Date()
      }
    })

    // Transform response to match expected format
    const newResponse = {
      name: newRSVP.name,
      attending: newRSVP.attending,
      submittedAt: newRSVP.submittedAt.toISOString()
    }

    // Your email address (can also be set as environment variable)
    const TARGET_EMAIL = 'john@fairfax-ball.com'

    // Create email content
    const emailSubject = `RSVP Response: ${name}`
    const emailBody = `
New RSVP submission:

Name: ${name}
Attending: ${attending === 'yes' ? 'Yes' : 'No'}
Submitted: ${new Date().toLocaleString()}

---
This RSVP was submitted via the 40th Birthday invitation website.
    `

    // For production, you would use a real email service like:
    // - Resend (recommended)
    // - SendGrid
    // - AWS SES
    // - Nodemailer with SMTP
    
    // Example with Resend (uncomment and configure):
    /*
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: 'rsvp@yourdomain.com',
      to: TARGET_EMAIL,
      subject: emailSubject,
      text: emailBody,
    });
    */

    // For development/testing, just log the email data
    console.log('Email would be sent to:', TARGET_EMAIL)
    console.log('Subject:', emailSubject)
    console.log('Body:', emailBody)

    // Success response
    res.status(200).json({ 
      success: true, 
      message: 'RSVP submitted successfully',
      response: newResponse
    })

  } catch (error) {
    console.error('RSVP submission error:', error)
    res.status(500).json({ 
      error: 'Failed to submit RSVP' 
    })
  }
}
