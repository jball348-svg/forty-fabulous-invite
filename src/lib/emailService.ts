// Email service for RSVP submissions
// This implementation now uses our mock API service for development

import { apiService } from './apiService';

export interface RSVPData {
  name?: string;
  attending?: 'yes' | 'no';
}

export const submitRSVP = async (data: RSVPData): Promise<{ success: boolean; message: string }> => {
  try {
    // Use our mock API service instead of trying to call serverless functions
    const result = await apiService.submitRSVP({
      name: data.name || '',
      attending: data.attending || 'no'
    });
    
    return { 
      success: result.success, 
      message: result.message 
    };
    
  } catch (error) {
    console.error('RSVP submission error:', error);
    return { 
      success: false, 
      message: 'Failed to submit RSVP. Please try again.' 
    };
  }
};
