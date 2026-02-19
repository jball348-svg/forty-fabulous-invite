// API service that works in both development and production
// In development, it can use localStorage fallback
// In production, it uses the serverless API endpoints

interface RSVPResponse {
  name: string;
  attending: "yes" | "no";
  submittedAt: string;
}

// Determine if we're in development mode
const isDevelopment = import.meta.env.DEV;

// API base URL - in production this will be your Vercel domain
const API_BASE_URL = isDevelopment ? '' : '';

export const apiService = {
  // Get all RSVP responses
  getResponses: async (): Promise<{ responses: RSVPResponse[] }> => {
    try {
      const response = await fetch('/api/rsvp');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('API call failed, falling back to localStorage:', error);
      
      // Fallback to localStorage for development
      if (isDevelopment && typeof window !== 'undefined') {
        const stored = localStorage.getItem('rsvpResponses');
        if (stored) {
          try {
            const responses = JSON.parse(stored);
            return { responses };
          } catch (e) {
            console.error('Failed to parse stored responses:', e);
          }
        }
        
        // Return initial sample data
        const initialData = [
          { name: "John Doe", attending: "yes" as const, submittedAt: new Date().toISOString() },
          { name: "Jane Smith", attending: "no" as const, submittedAt: new Date().toISOString() }
        ];
        return { responses: initialData };
      }
      
      throw error;
    }
  },

  // Submit RSVP
  submitRSVP: async (data: { name: string; attending: string }): Promise<{ 
    success: boolean; 
    message: string; 
    response?: RSVPResponse 
  }> => {
    try {
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API call failed, falling back to localStorage:', error);
      
      // Fallback to localStorage for development
      if (isDevelopment && typeof window !== 'undefined') {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 800));

        console.log('Submitting RSVP:', data);

        // Validate required fields
        if (!data.name || !data.attending) {
          throw new Error('Missing required fields');
        }

        // Get existing responses
        const stored = localStorage.getItem('rsvpResponses');
        let responses: RSVPResponse[] = [];
        if (stored) {
          try {
            responses = JSON.parse(stored);
          } catch (e) {
            console.error('Failed to parse stored responses:', e);
          }
        }

        // Store the RSVP response
        const newResponse: RSVPResponse = {
          name: data.name,
          attending: data.attending as "yes" | "no",
          submittedAt: new Date().toISOString()
        };
        
        responses.push(newResponse);
        localStorage.setItem('rsvpResponses', JSON.stringify(responses));
        
        console.log('Updated responses:', responses);

        // Success response
        return { 
          success: true, 
          message: 'RSVP submitted successfully',
          response: newResponse
        };
      }
      
      throw error;
    }
  },

  // Delete RSVP response
  deleteRSVP: async (index: number): Promise<{ 
    success: boolean; 
    message: string;
  }> => {
    try {
      const response = await fetch('/api/rsvp', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ index }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API call failed, falling back to localStorage:', error);
      
      // Fallback to localStorage for development
      if (isDevelopment && typeof window !== 'undefined') {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 300));

        console.log('Deleting RSVP at index:', index);

        // Get existing responses
        const stored = localStorage.getItem('rsvpResponses');
        let responses: RSVPResponse[] = [];
        if (stored) {
          try {
            responses = JSON.parse(stored);
          } catch (e) {
            console.error('Failed to parse stored responses:', e);
          }
        }

        if (index < 0 || index >= responses.length) {
          throw new Error('Invalid RSVP index');
        }

        const deletedResponse = responses[index];
        responses.splice(index, 1);
        localStorage.setItem('rsvpResponses', JSON.stringify(responses));
        
        console.log('Deleted response:', deletedResponse);
        console.log('Updated responses:', responses);

        return { 
          success: true, 
          message: `RSVP for ${deletedResponse.name} deleted successfully`
        };
      }
      
      throw error;
    }
  }
};
