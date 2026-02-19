# Email Setup for RSVP Form

## Current Status
✅ Removed visible email references from the website  
✅ Created email service infrastructure  
⚠️ Email backend needs to be configured for production

## Options for Email Backend

### Option 1: Web3Forms (Recommended - Free & Easy)
1. Sign up at [https://web3forms.com/](https://web3forms.com/)
2. Get your access key
3. Update `src/lib/emailService.ts` with the Web3Forms implementation

### Option 2: EmailJS (Free tier available)
1. Sign up at [https://www.emailjs.com/](https://www.emailjs.com/)
2. Create an email service and template
3. Update the email service with your EmailJS configuration

### Option 3: Serverless Function (Most reliable)
Deploy the `api/rsvp.js` file to:
- **Vercel**: Automatically works when you deploy to Vercel
- **Netlify**: Add as a Netlify Function
- **Cloudflare Workers**: Convert to Worker format

## Quick Setup with Web3Forms

Replace the content in `src/lib/emailService.ts` with:

```typescript
export const submitRSVP = async (data: RSVPData): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        access_key: 'YOUR_WEB3FORMS_ACCESS_KEY',
        subject: `RSVP: ${data.name}`,
        from_name: data.name,
        message: `
Name: ${data.name}
Attending: ${data.attending === 'yes' ? 'Yes' : 'No'}
Submitted: ${new Date().toLocaleString()}
        `,
        email: 'john@fairfax-ball.com' // Your email
      }),
    });

    const result = await response.json();
    return result.success ? 
      { success: true, message: 'RSVP submitted successfully' } :
      { success: false, message: 'Failed to submit RSVP' };
      
  } catch (error) {
    console.error('Email service error:', error);
    return { success: false, message: 'Failed to submit RSVP. Please try again.' };
  }
};
```

## Testing
The form currently logs RSVP data to the console. Check the browser console to see the data that would be emailed.

## Security Notes
- Your email address is now only in the backend code
- No email addresses are visible on the frontend
- All form submissions are validated before sending
