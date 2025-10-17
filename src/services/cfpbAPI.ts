// CFPB API Service
const CFPB_BASE_URL = 'https://www.consumerfinance.gov/data-research/consumer-complaints/search/api/v1/';

export const cfpbAPI = {
  // Search complaints by company
  searchComplaints: async (company: string, limit: number = 100) => {
    try {
      const url = `${CFPB_BASE_URL}?company=${encodeURIComponent(company)}&size=${limit}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`CFPB API error: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('CFPB API error:', error);
      throw error;
    }
  },

  // Get complaints by product type
  searchByProduct: async (product: string, limit: number = 100) => {
    try {
      const url = `${CFPB_BASE_URL}?product=${encodeURIComponent(product)}&size=${limit}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`CFPB API error: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('CFPB API error:', error);
      throw error;
    }
  },

  // Get recent complaints
  getRecentComplaints: async (limit: number = 50) => {
    try {
      const url = `${CFPB_BASE_URL}?size=${limit}&sort=created_date_desc`;
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
