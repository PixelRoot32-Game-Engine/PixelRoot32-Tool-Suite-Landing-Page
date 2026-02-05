/**
 * Subscription Service
 * Handles integration with Buttondown API
 */

const BUTTONDOWN_API_URL = import.meta.env.VITE_BUTTONDOWN_API_URL || 'https://api.buttondown.com/v1';
const API_KEY = import.meta.env.VITE_BUTTONDOWN_API_KEY;

export interface SubscriptionResult {
  success: boolean;
  message?: string;
}

/**
 * Subscribes an email to the Buttondown newsletter
 * @param email The email address to subscribe
 * @param metadata Optional metadata (e.g., tags)
 */
export async function subscribeToNewsletter(email: string, metadata: Record<string, any> = {}): Promise<SubscriptionResult> {
  if (!email || !email.includes('@')) {
    return { success: false, message: 'Invalid email address' };
  }

  if (!API_KEY) {
    console.error('Buttondown API key is missing');
    return { success: false, message: 'Configuration error' };
  }

  try {
    const response = await fetch(`${BUTTONDOWN_API_URL}/subscribers`, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email_address: email,
        metadata,
        tags: ['pixelroot32-tool-suite'],
        referrer_url: window.location.href,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      return { success: true };
    } else {
      // Handle specific error cases from Buttondown
      if (data.detail && data.detail.includes('already subscribed')) {
        return { success: true }; // Treat as success if already subscribed
      }
      return { 
        success: false, 
        message: data.detail || 'Failed to subscribe' 
      };
    }
  } catch (error) {
    console.error('Subscription error:', error);
    return { 
      success: false, 
      message: 'Network error. Please try again later.' 
    };
  }
}
