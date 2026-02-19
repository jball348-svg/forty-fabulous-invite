// API service for development - simulates backend API calls
// In production, this would make real fetch calls to your serverless functions

interface RSVPResponse {
  name: string;
  attending: "yes" | "no";
  submittedAt: string;
}

// Load responses from localStorage or use initial data
const loadResponses = (): RSVPResponse[] => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('rsvpResponses');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error('Failed to parse stored responses:', e);
      }
    }
  }
  
  // Initial sample data
  const initialData = [
    { name: "John Doe", attending: "yes" as const, submittedAt: new Date().toISOString() },
    { name: "Jane Smith", attending: "no" as const, submittedAt: new Date().toISOString() }
  ];
  
  if (typeof window !== 'undefined') {
    localStorage.setItem('rsvpResponses', JSON.stringify(initialData));
  }
  
  return initialData;
};

// Save responses to localStorage
const saveResponses = (responses: RSVPResponse[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('rsvpResponses', JSON.stringify(responses));
  }
};

// In-memory storage for RSVP responses (simulates backend storage)
let rsvpResponses: RSVPResponse[] = loadResponses();

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const apiService = {
  // Get all RSVP responses
  getResponses: async (): Promise<{ responses: RSVPResponse[] }> => {
    await delay(500); // Simulate network delay
    console.log('Getting responses:', rsvpResponses);
    return { responses: [...rsvpResponses] };
  },

  // Submit RSVP
  submitRSVP: async (data: { name: string; attending: string }): Promise<{ 
    success: boolean; 
    message: string; 
    response?: RSVPResponse 
  }> => {
    await delay(800); // Simulate network delay

    console.log('Submitting RSVP:', data);

    // Validate required fields
    if (!data.name || !data.attending) {
      throw new Error('Missing required fields');
    }

    // Store the RSVP response
    const newResponse: RSVPResponse = {
      name: data.name,
      attending: data.attending as "yes" | "no",
      submittedAt: new Date().toISOString()
    };
    
    rsvpResponses.push(newResponse);
    saveResponses(rsvpResponses);
    
    console.log('Updated responses:', rsvpResponses);

    // Success response
    return { 
      success: true, 
      message: 'RSVP submitted successfully',
      response: newResponse
    };
  },

  // Delete RSVP response
  deleteRSVP: async (index: number): Promise<{ 
    success: boolean; 
    message: string;
  }> => {
    await delay(300); // Simulate network delay

    console.log('Deleting RSVP at index:', index);

    if (index < 0 || index >= rsvpResponses.length) {
      throw new Error('Invalid RSVP index');
    }

    const deletedResponse = rsvpResponses[index];
    rsvpResponses.splice(index, 1);
    saveResponses(rsvpResponses);
    
    console.log('Deleted response:', deletedResponse);
    console.log('Updated responses:', rsvpResponses);

    return { 
      success: true, 
      message: `RSVP for ${deletedResponse.name} deleted successfully`
    };
  }
};
