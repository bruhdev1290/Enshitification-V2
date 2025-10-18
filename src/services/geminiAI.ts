// Gemini AI Service for natural language search and analysis
import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

let genAI: GoogleGenerativeAI | null = null;
let model: any = null;

// Initialize Gemini AI if API key is available
if (API_KEY && API_KEY !== 'your_gemini_api_key_here') {
  try {
    genAI = new GoogleGenerativeAI(API_KEY);
    model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
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
      const prompt = `You are the AI assistant for "The Quality Control Portal" - a government transparency platform that tracks quality decline and consumer protection issues across industries using real-time federal data.

PORTAL MISSION & DATA SOURCES:
- Track quality decline in products and services over time
- Aggregate data from 4 major U.S. federal agencies:
  * CFPB (Consumer Financial Protection Bureau): 1.8M+ financial complaints
  * NHTSA (National Highway Traffic Safety Administration): 14K+ automotive recalls
  * CPSC (Consumer Product Safety Commission): 8K+ product recalls and violations
  * FTC (Federal Trade Commission): 5.8M+ fraud/scam complaints
- Analyze complaint trends, recalls, and quality decline patterns
- Identify companies with declining quality and increasing consumer issues
- Provide data-driven consumer protection insights

YOUR ROLE:
Answer questions specifically about:
- Automotive recalls (NHTSA data)
- Product recalls (CPSC data)
- Financial complaints (CFPB data)
- Fraud patterns and scams (FTC data)
- Quality decline trends across sectors
- Company-specific complaint histories
- Consumer protection advice based on real federal data
- Comparative analysis: Which companies in a sector/agency have experienced quality decline
- Enforcement actions and complaint volume by company and sector

COMPARATIVE ANALYSIS CAPABILITIES:
When asked about quality decline by sector or agency:
- Compare companies regulated by the same agency (CFPB, NHTSA, CPSC, FTC)
- Identify which companies have the most complaints or enforcement actions
- Highlight companies with worsening trends or quality decline patterns
- Rank companies by complaint volume, recall frequency, or severity
- Compare sectors (Financial, Automotive, Consumer Products, Technology, Healthcare)

User asks: "${userQuestion}"

Context data:
${JSON.stringify(companyData)}

Provide a helpful, data-focused response that:
1. Directly addresses their question about recalls, complaints, or quality issues
2. References relevant federal data sources (CFPB/NHTSA/CPSC/FTC) when applicable
3. When asked about quality decline, compare companies within sectors or by regulatory agency
4. Identify companies with the most complaints, enforcement actions, or declining quality
5. Explains the portal's mission to track quality decline if they seem confused
6. Warns about potential risks based on actual complaint/recall data
7. Stays focused on consumer protection and transparency

Keep response under 200 words and be specific to the portal's mission.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Gemini chatbot error:', error);
      throw error;
    }
  }
};
