// FTC API Service
const FTC_BASE_URL = 'https://api.ftc.gov/v0';
const FTC_API_KEY = import.meta.env.VITE_FTC_API_KEY || 'DEMO_KEY';

export const ftcAPI = {
  // Get Do Not Call complaints
  getDNCComplaints: async (limit: number = 100) => {
    try {
      const url = `${FTC_BASE_URL}/dnc-complaints?api_key=${FTC_API_KEY}&limit=${limit}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`FTC API error: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('FTC API error:', error);
      return { data: [] };
    }
  },

  // Search fraud reports (using Consumer Sentinel Network data)
  searchFraudReports: async (keyword: string = '', limit: number = 50) => {
    try {
      // Note: FTC's Consumer Sentinel API may have limited public access
      // Using DNC complaints as a fallback since it's publicly accessible
      const url = `${FTC_BASE_URL}/dnc-complaints?api_key=${FTC_API_KEY}&limit=${limit}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`FTC API error: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Filter by keyword if provided
      if (keyword && data.data) {
        const filtered = data.data.filter((item: any) => 
          JSON.stringify(item).toLowerCase().includes(keyword.toLowerCase())
        );
        return { data: filtered };
      }
      
      return data;
    } catch (error) {
      console.error('FTC fraud search error:', error);
      return { data: [] };
    }
  },

  // Get recent fraud complaints
  getRecentFraudComplaints: async (limit: number = 50) => {
    try {
      const url = `${FTC_BASE_URL}/dnc-complaints?api_key=${FTC_API_KEY}&limit=${limit}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`FTC API error: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('FTC API error:', error);
      // Return empty result on error
      return { data: [] };
    }
  },

  // Check if FTC API is available
  isAvailable: async () => {
    try {
      const url = `${FTC_BASE_URL}/dnc-complaints?api_key=${FTC_API_KEY}&limit=1`;
      const response = await fetch(url);
      return response.ok;
    } catch (error) {
      return false;
    }
  }
};
