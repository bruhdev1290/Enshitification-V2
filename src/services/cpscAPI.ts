// CPSC (Consumer Product Safety Commission) Recall Retrieval API Service
// API Documentation: https://www.saferproducts.gov/RestWebServices/

const CPSC_BASE_URL = 'https://www.saferproducts.gov/RestWebServices';

// TypeScript interfaces for CPSC API response structure
export interface CPSCRecall {
  RecallID?: number;
  RecallNumber?: string;
  RecallDate?: string;
  Description?: string;
  URL?: string;
  Title?: string;
  ConsumerContact?: string;
  LastPublishDate?: string;
  Products?: CPSCProduct[];
  Inconjunctions?: CPSCInconjunction[];
  Images?: CPSCImage[];
  Injuries?: CPSCInjury[];
  Manufacturers?: CPSCManufacturer[];
  ProductUPCs?: string[];
  Hazards?: CPSCHazard[];
  Remedies?: CPSCRemedy[];
}

export interface CPSCProduct {
  Name?: string;
  Description?: string;
  Model?: string;
  Type?: string;
  CategoryID?: string;
  NumberOfUnits?: string;
}

export interface CPSCInconjunction {
  Country?: string;
}

export interface CPSCImage {
  URL?: string;
}

export interface CPSCInjury {
  Name?: string;
}

export interface CPSCManufacturer {
  Name?: string;
  Country?: string;
  CompanyID?: string;
}

export interface CPSCHazard {
  Name?: string;
  HazardTypeID?: string;
}

export interface CPSCRemedy {
  Name?: string;
}

export interface CPSCRecallResponse {
  data?: CPSCRecall[];
  error?: string;
  success: boolean;
  recordCount?: number;
}

export interface CPSCQueryParams {
  RecallTitle?: string;
  Hazard?: string;
  RecallDateStart?: string; // Format: YYYY-MM-DD
  RecallDateEnd?: string;   // Format: YYYY-MM-DD
  RecallNumber?: string;
  RecallID?: number;
  Manufacturer?: string;
  ProductType?: string;
  format?: 'json' | 'xml';
}

// Validation helper functions
const validateDate = (dateString: string): boolean => {
  if (!dateString) return true;
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateString)) return false;
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date.getTime());
};

const validateParams = (params: CPSCQueryParams): { valid: boolean; error?: string } => {
  // Validate date formats
  if (params.RecallDateStart && !validateDate(params.RecallDateStart)) {
    return { valid: false, error: 'Invalid RecallDateStart format. Use YYYY-MM-DD' };
  }
  if (params.RecallDateEnd && !validateDate(params.RecallDateEnd)) {
    return { valid: false, error: 'Invalid RecallDateEnd format. Use YYYY-MM-DD' };
  }

  // Validate date range
  if (params.RecallDateStart && params.RecallDateEnd) {
    const startDate = new Date(params.RecallDateStart);
    const endDate = new Date(params.RecallDateEnd);
    if (startDate > endDate) {
      return { valid: false, error: 'RecallDateStart must be before RecallDateEnd' };
    }
  }

  // Validate format
  if (params.format && !['json', 'xml'].includes(params.format)) {
    return { valid: false, error: 'Format must be either "json" or "xml"' };
  }

  return { valid: true };
};

// XML to JSON conversion utility
const parseXMLToJSON = (xmlString: string): any => {
  try {
    // Simple XML to JSON parser for CPSC API responses
    // This is a basic implementation that works for the CPSC API structure
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
    
    const parseElement = (element: Element): any => {
      const obj: any = {};
      
      // Check for parse errors
      if (element.nodeName === 'parsererror') {
        throw new Error('XML parsing error');
      }
      
      // Get attributes
      if (element.attributes.length > 0) {
        obj['@attributes'] = {};
        for (let i = 0; i < element.attributes.length; i++) {
          const attr = element.attributes[i];
          obj['@attributes'][attr.name] = attr.value;
        }
      }
      
      // Get child elements
      if (element.children.length > 0) {
        for (let i = 0; i < element.children.length; i++) {
          const child = element.children[i];
          const childData = parseElement(child);
          
          if (obj[child.nodeName]) {
            // Convert to array if multiple elements with same name
            if (!Array.isArray(obj[child.nodeName])) {
              obj[child.nodeName] = [obj[child.nodeName]];
            }
            obj[child.nodeName].push(childData);
          } else {
            obj[child.nodeName] = childData;
          }
        }
      } else {
        // Get text content
        return element.textContent || '';
      }
      
      return obj;
    };
    
    return parseElement(xmlDoc.documentElement);
  } catch (error) {
    console.error('XML parsing error:', error);
    throw error;
  }
};

// Build query URL from parameters
const buildQueryURL = (params: CPSCQueryParams): string => {
  const queryParams = new URLSearchParams();
  
  // Set default format to json
  const format = params.format || 'json';
  queryParams.append('format', format);
  
  // Add query parameters
  if (params.RecallTitle) queryParams.append('RecallTitle', params.RecallTitle);
  if (params.Hazard) queryParams.append('Hazard', params.Hazard);
  if (params.RecallDateStart) queryParams.append('RecallDateStart', params.RecallDateStart);
  if (params.RecallDateEnd) queryParams.append('RecallDateEnd', params.RecallDateEnd);
  if (params.RecallNumber) queryParams.append('RecallNumber', params.RecallNumber);
  if (params.RecallID) queryParams.append('RecallID', params.RecallID.toString());
  if (params.Manufacturer) queryParams.append('Manufacturer', params.Manufacturer);
  if (params.ProductType) queryParams.append('ProductType', params.ProductType);
  
  return `${CPSC_BASE_URL}/Recall?${queryParams.toString()}`;
};

export const cpscAPI = {
  /**
   * Query CPSC Recall Retrieval API
   * @param params Query parameters for filtering recalls
   * @returns Promise with recall data
   */
  queryRecalls: async (params: CPSCQueryParams): Promise<CPSCRecallResponse> => {
    try {
      // Validate parameters
      const validation = validateParams(params);
      if (!validation.valid) {
        return {
          success: false,
          error: validation.error,
          data: []
        };
      }

      const url = buildQueryURL(params);
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`CPSC API error: ${response.status} ${response.statusText}`);
      }

      const contentType = response.headers.get('content-type');
      let data: any;

      // Handle JSON response
      if (contentType?.includes('application/json')) {
        data = await response.json();
      } 
      // Handle XML response with conversion
      else if (contentType?.includes('xml') || params.format === 'xml') {
        const xmlText = await response.text();
        data = parseXMLToJSON(xmlText);
      } 
      else {
        // Try JSON first, fallback to XML
        try {
          data = await response.json();
        } catch {
          const xmlText = await response.text();
          data = parseXMLToJSON(xmlText);
        }
      }

      // Normalize data structure
      let recalls: CPSCRecall[] = [];
      if (Array.isArray(data)) {
        recalls = data;
      } else if (data && typeof data === 'object') {
        // Handle various response structures
        recalls = data.data || data.recalls || data.Recall || [data];
        if (!Array.isArray(recalls)) {
          recalls = [recalls];
        }
      }

      return {
        success: true,
        data: recalls,
        recordCount: recalls.length
      };
    } catch (error) {
      console.error('CPSC API error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        data: []
      };
    }
  },

  /**
   * Get recalls by title keyword
   * @param title Keyword to search in recall titles
   * @returns Promise with matching recalls
   */
  getRecallsByTitle: async (title: string): Promise<CPSCRecallResponse> => {
    return cpscAPI.queryRecalls({ RecallTitle: title });
  },

  /**
   * Get recalls by hazard type
   * @param hazard Hazard type to filter by
   * @returns Promise with matching recalls
   */
  getRecallsByHazard: async (hazard: string): Promise<CPSCRecallResponse> => {
    return cpscAPI.queryRecalls({ Hazard: hazard });
  },

  /**
   * Get recalls within a date range
   * @param startDate Start date in YYYY-MM-DD format
   * @param endDate End date in YYYY-MM-DD format
   * @returns Promise with recalls in date range
   */
  getRecallsByDateRange: async (
    startDate: string,
    endDate: string
  ): Promise<CPSCRecallResponse> => {
    return cpscAPI.queryRecalls({
      RecallDateStart: startDate,
      RecallDateEnd: endDate
    });
  },

  /**
   * Sample query: Get stroller recalls with pinch hazards
   * This is a demonstration query combining multiple parameters
   * @returns Promise with stroller recalls that have pinch hazards
   */
  getStrollerPinchHazards: async (): Promise<CPSCRecallResponse> => {
    return cpscAPI.queryRecalls({
      RecallTitle: 'stroller',
      Hazard: 'pinch'
    });
  },

  /**
   * Get recent recalls (last 30 days)
   * @returns Promise with recent recalls
   */
  getRecentRecalls: async (): Promise<CPSCRecallResponse> => {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 30);

    return cpscAPI.queryRecalls({
      RecallDateStart: startDate.toISOString().split('T')[0],
      RecallDateEnd: endDate.toISOString().split('T')[0]
    });
  },

  /**
   * Check if CPSC API is available
   * @returns Promise<boolean> indicating API availability
   */
  isAvailable: async (): Promise<boolean> => {
    try {
      const url = `${CPSC_BASE_URL}/Recall?format=json`;
      const response = await fetch(url);
      return response.ok;
    } catch (error) {
      return false;
    }
  },

  /**
   * Query recalls with XML format (optional XML fallback)
   * @param params Query parameters
   * @returns Promise with recall data parsed from XML
   */
  queryRecallsXML: async (params: Omit<CPSCQueryParams, 'format'>): Promise<CPSCRecallResponse> => {
    return cpscAPI.queryRecalls({ ...params, format: 'xml' });
  }
};

// Export utility functions for external use
export const cpscUtils = {
  validateDate,
  validateParams,
  parseXMLToJSON,
  buildQueryURL
};
