// CFPB API Service
const CFPB_BASE_URL = 'https://www.consumerfinance.gov/data-research/consumer-complaints/search/api/v1/';
// CORS proxy for browser-based access
const CORS_PROXY = 'https://corsproxy.io/?';

export const cfpbAPI = {
  // Search complaints by company
  searchComplaints: async (company: string, limit: number = 100) => {
    try {
      // Use CORS proxy to avoid CORS issues in browser
      const apiUrl = `${CFPB_BASE_URL}?company=${encodeURIComponent(company)}&size=${limit}`;
      const url = `${CORS_PROXY}${encodeURIComponent(apiUrl)}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`CFPB API error: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('CFPB API error:', error);
      // Return empty result on error instead of throwing
      return { hits: { hits: [] } };
    }
  },

  // Get complaints by product type
  searchByProduct: async (product: string, limit: number = 100) => {
    try {
      // Use CORS proxy to avoid CORS issues in browser
      const apiUrl = `${CFPB_BASE_URL}?product=${encodeURIComponent(product)}&size=${limit}`;
      const url = `${CORS_PROXY}${encodeURIComponent(apiUrl)}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`CFPB API error: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('CFPB API error:', error);
      // Return empty result on error instead of throwing
      return { hits: { hits: [] } };
    }
  },

  // Get recent complaints
  getRecentComplaints: async (limit: number = 50) => {
    try {
      // Use CORS proxy to avoid CORS issues in browser
      const apiUrl = `${CFPB_BASE_URL}?size=${limit}&sort=created_date_desc`;
      const url = `${CORS_PROXY}${encodeURIComponent(apiUrl)}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`CFPB API error: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('CFPB API error:', error);
      // Return empty result on error
      return { hits: { hits: [] } };
    }
  }
};
