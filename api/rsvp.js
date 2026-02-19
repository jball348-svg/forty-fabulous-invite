// Simple serverless function for RSVP submission
// This can be deployed on Vercel, Netlify, or any serverless platform

// In-memory storage for RSVP responses (for demo purposes)
// In production, you'd use a database like Supabase, Firebase, or PostgreSQL
let rsvpResponses = [];

// Initialize with some sample data (optional)
rsvpResponses = [
  { name: "John Doe", attending: "yes", submittedAt: new Date().toISOString() },
  { name: "Jane Smith", attending: "no", submittedAt: new Date().toISOString() }
];

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    // Return all RSVP responses for admin view
    return res.status(200).json({ responses: rsvpResponses });
  }

  if (req.method === 'DELETE') {
    // Delete an RSVP response
    try {
      const { index } = req.body;

      if (index < 0 || index >= rsvpResponses.length) {
        return res.status(400).json({ error: 'Invalid RSVP index' });
      }

      const deletedResponse = rsvpResponses[index];
      rsvpResponses.splice(index, 1);

      return res.status(200).json({ 
        success: true, 
        message: `RSVP for ${deletedResponse.name} deleted successfully`
      });
    } catch (error) {
      console.error('Delete RSVP error:', error);
      return res.status(500).json({ 
        error: 'Failed to delete RSVP' 
      });
    }
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, attending } = req.body;

    // Validate required fields
    if (!name || !attending) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Store the RSVP response
    const newResponse = {
      name,
      attending,
      submittedAt: new Date().toISOString()
    };
    
    rsvpResponses.push(newResponse);

    // Your email address (can also be set as environment variable)
    const TARGET_EMAIL = 'john@fairfax-ball.com';

    // Create email content
    const emailSubject = `RSVP Response: ${name}`;
    const emailBody = `
New RSVP submission:

Name: ${name}
Attending: ${attending === 'yes' ? 'Yes' : 'No'}
Submitted: ${new Date().toLocaleString()}

---
This RSVP was submitted via the 40th Birthday invitation website.
    `;

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
    console.log('Email would be sent to:', TARGET_EMAIL);
    console.log('Subject:', emailSubject);
    console.log('Body:', emailBody);

    // Success response
    res.status(200).json({ 
      success: true, 
      message: 'RSVP submitted successfully',
      response: newResponse
    });

  } catch (error) {
    console.error('RSVP submission error:', error);
    res.status(500).json({ 
      error: 'Failed to submit RSVP' 
    });
  }
}
