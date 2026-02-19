// Mock API for development - simulates the serverless function
// In production, this would be replaced by actual serverless functions

interface RSVPResponse {
  name: string;
  attending: "yes" | "no";
  submittedAt: string;
}

// In-memory storage for RSVP responses
let rsvpResponses: RSVPResponse[] = [
  { name: "John Doe", attending: "yes", submittedAt: new Date().toISOString() },
  { name: "Jane Smith", attending: "no", submittedAt: new Date().toISOString() }
];

export const mockApiHandler = async (req: Request): Promise<Response> => {
  const url = new URL(req.url);
  const method = req.method;

  if (method === 'GET') {
    // Return all RSVP responses for admin view
    return new Response(JSON.stringify({ responses: rsvpResponses }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  if (method === 'POST') {
    try {
      const body = await req.json() as { name: string; attending: string };

      // Validate required fields
      if (!body.name || !body.attending) {
        return new Response(JSON.stringify({ error: 'Missing required fields' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      // Store the RSVP response
      const newResponse: RSVPResponse = {
        name: body.name,
        attending: body.attending as "yes" | "no",
        submittedAt: new Date().toISOString()
      };
      
      rsvpResponses.push(newResponse);

      // Success response
      return new Response(JSON.stringify({ 
        success: true, 
        message: 'RSVP submitted successfully',
        response: newResponse
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });

    } catch (error) {
      return new Response(JSON.stringify({ 
        error: 'Failed to submit RSVP' 
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }

  // Method not allowed
  return new Response(JSON.stringify({ error: 'Method not allowed' }), {
    status: 405,
    headers: { 'Content-Type': 'application/json' }
  });
};
