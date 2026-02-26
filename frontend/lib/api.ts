import axios from 'axios';

// Real API wrapper for NyayaSetu
const BASE_URL = 'http://localhost:8000';

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const api = {
  post: async <T>(url: string, body: any): Promise<{ success: boolean, data: T | null, error: string | null }> => {
    try {
      // Use fetch for some endpoints if needed or just use apiClient for consistency
      // Given the previous local version used fetch, I'll stick to a consistent approach
      const response = await fetch(`${BASE_URL}${url}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const result = await response.json();
      
      // Handle different response structures from the backend
      if (url === '/complaint') {
          return result;
      }
      
      if (result && typeof result === 'object' && 'success' in result) {
        return result;
      }

      return { success: true, data: result as T, error: null };
    } catch (err: any) {
      console.error(`API Error (${url}):`, err);
      return { success: false, data: null, error: err.message };
    }
  },
  
  get: async <T>(url: string): Promise<{ success: boolean, data: T | null, error: string | null }> => {
    try {
      const response = await fetch(`${BASE_URL}${url}`);
      const result = await response.json();
      
      if (result && typeof result === 'object' && 'success' in result) {
        return result;
      }
      
      return { success: true, data: result as T, error: null };
    } catch (err: any) {
      console.error(`API Error (${url}):`, err);
      return { 
        success: false, 
        data: null, 
        error: err.message || "An unknown error occurred" 
      };
    }
  }
};
