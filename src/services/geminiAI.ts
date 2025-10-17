// Gemini AI Service for natural language search and analysis
import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

let genAI: GoogleGenerativeAI | null = null;
let model: any = null;

// Initialize Gemini AI if API key is available
if (API_KEY && API_KEY !== 'your_gemini_api_key_here') {
  try {
    genAI = new GoogleGenerativeAI(API_KEY);
    model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  } catch (error) {
    console.warn('Gemini AI not initialized:', error);
  }
}

export const geminiService = {
  // Check if Gemini is available
  isAvailable: () => {
    return model !== null;
  },

  // Natural language search
  naturalLanguageSearch: async (query: string, data: any) => {
    if (!model) {
      throw new Error('Gemini API not configured. Add VITE_GEMINI_API_KEY to your .env file.');
    }

    try {
      const prompt = `You are a consumer protection data assistant. 
User query: "${query}"

Available data includes companies, sectors, and timeline events.
Parse this natural language query and return a JSON response with:
{
  "intent": "search_company" | "search_sector" | "search_issue" | "general_query",
  "searchTerm": "extracted search term",
  "filters": {
    "sector": "if applicable",
    "severity": "if applicable",
    "source": "CFPB|NHTSA|CPSC|FTC if applicable"
  },
  "answer": "brief natural language answer about what you're searching for"
}

Return ONLY valid JSON, no other text.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // Parse JSON from response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      
      // Fallback if JSON parsing fails
      return {
        intent: 'general_query',
        searchTerm: query,
        filters: {},
        answer: `Searching for: ${query}`
      };
    } catch (error) {
      console.error('Gemini natural language search error:', error);
      // Fallback to simple search
      return {
        intent: 'general_query',
        searchTerm: query,
        filters: {},
        answer: `Searching for: ${query}`
      };
    }
  },

  // Analyze complaint trends for a company
  analyzeComplaintTrends: async (company: string, complaints: any[]) => {
    if (!model) {
      throw new Error('Gemini API not configured');
    }

    try {
      const prompt = `Analyze these consumer complaints for ${company}:
${JSON.stringify(complaints.slice(0, 5))}

Provide:
1. Top 3 recurring issues
2. Severity assessment (Low/Medium/High/Critical)
3. Trend analysis (Improving/Stable/Worsening)
4. Consumer recommendations

Format as JSON with fields: recurringIssues (array), severity, trend, recommendations (array)`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      
      return {
        recurringIssues: ['Unable to analyze'],
        severity: 'Unknown',
        trend: 'Unknown',
        recommendations: ['Gemini AI analysis unavailable']
      };
    } catch (error) {
      console.error('Gemini complaint analysis error:', error);
      throw error;
    }
  },

  // Detect fraud patterns
  detectFraudPatterns: async (ftcComplaints: any[]) => {
    if (!model) {
      throw new Error('Gemini API not configured');
    }

    try {
      const prompt = `Analyze these FTC fraud complaints:
${JSON.stringify(ftcComplaints.slice(0, 10))}

Identify:
1. Emerging scam types
2. Most vulnerable demographics
3. Preventive recommendations

Provide a clear, concise analysis.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Gemini fraud detection error:', error);
      throw error;
    }
  },

  // Consumer advice chatbot
  consumerAdviceBot: async (userQuestion: string, companyData: any) => {
    if (!model) {
      throw new Error('Gemini API not configured');
    }

    try {
      const prompt = `User asks: "${userQuestion}"

Context about the company:
${JSON.stringify(companyData)}

Provide personalized consumer advice based on complaint data.
Be helpful, accurate, and warn about potential risks.
Keep response under 150 words.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Gemini chatbot error:', error);
      throw error;
    }
  }
};
