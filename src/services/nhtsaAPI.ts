// NHTSA API Service
const NHTSA_BASE_URL = 'https://api.nhtsa.gov';

export const nhtsaAPI = {
  // Get recalls by manufacturer
  getRecallsByMake: async (make: string) => {
    try {
      const currentYear = new Date().getFullYear();
      const url = `${NHTSA_BASE_URL}/recalls/recallsByVehicle?make=${encodeURIComponent(make)}&modelYear=${currentYear}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`NHTSA API error: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('NHTSA API error:', error);
      return { results: [] };
    }
  },

  // Get recent recalls
  getRecentRecalls: async () => {
    try {
      const currentYear = new Date().getFullYear();
      const url = `${NHTSA_BASE_URL}/recalls/recallsByVehicle?modelYear=${currentYear}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`NHTSA API error: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('NHTSA API error:', error);
      return { results: [] };
    }
  },

  // Search recalls by keyword
  searchRecalls: async (keyword: string) => {
    try {
      // NHTSA doesn't have direct keyword search, so we'll get recent and filter
      const data = await nhtsaAPI.getRecentRecalls();
      
      if (data.results) {
        const filtered = data.results.filter((recall: any) => 
          recall.Summary?.toLowerCase().includes(keyword.toLowerCase()) ||
          recall.Component?.toLowerCase().includes(keyword.toLowerCase())
        );
        return { results: filtered };
      }
      
      return { results: [] };
    } catch (error) {
      console.error('NHTSA search error:', error);
      return { results: [] };
    }
  }
};
