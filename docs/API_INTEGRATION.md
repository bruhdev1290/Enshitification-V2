# API Integration Guide

This guide covers how to integrate with the federal agency APIs and Google Gemini API.

## Federal Agency APIs

### 1. CFPB API - Consumer Financial Protection Bureau

**Base URL**: `https://www.consumerfinance.gov/data-research/consumer-complaints/search/api/v1/`

**No API key required** - Public API

**Example Query**: Get complaints for Wells Fargo
```javascript
const url = 'https://www.consumerfinance.gov/data-research/consumer-complaints/search/api/v1/?company=Wells%20Fargo&size=100';
const response = await fetch(url);
const data = await response.json();
```

**Documentation**: https://cfpb.github.io/api/ccdb/

### 2. NHTSA API - National Highway Traffic Safety Administration

**Base URL**: `https://api.nhtsa.gov/`

**No API key required** - Public API

**Example Query**: Get recalls for Ford
```javascript
const url = 'https://api.nhtsa.gov/recalls/recallsByVehicle?make=Ford&modelYear=2024';
const response = await fetch(url);
const data = await response.json();
```

**Documentation**: https://www.nhtsa.gov/nhtsa-datasets-and-apis

### 3. CPSC API - Consumer Product Safety Commission

**Base URL**: `https://www.saferproducts.gov/RestWebServices/`

**No API key required** - Public API

**Example Query**: Get recent recalls
```javascript
const url = 'https://www.saferproducts.gov/RestWebServices/Recall?format=json&RecallDateStart=2024-01-01';
const response = await fetch(url);
const data = await response.json();
```

**Documentation**: https://www.cpsc.gov/s3fs-public/RecallRetrievalWebServicesProgrammersGuide20180917.pdf

### 4. FTC API - Federal Trade Commission

**Base URL**: `https://api.ftc.gov/v0/`

**API Key**: Use `DEMO_KEY` for testing or get your own

**Example Query**: Get Do Not Call complaints
```javascript
const url = 'https://api.ftc.gov/v0/dnc-complaints?api_key=DEMO_KEY';
const response = await fetch(url);
const data = await response.json();
```

**Documentation**: https://api.ftc.gov/

## Google Gemini API Integration

### Setup

1. Get your API key from: https://makersuite.google.com/app/apikey
2. Add to `.env`:
   ```env
   VITE_GEMINI_API_KEY=your_key_here
   ```

### Installation

```bash
npm install @google/generative-ai
```

### Basic Usage

```javascript
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
```

### Example Features

#### 1. AI Complaint Analyzer

```javascript
async function analyzeComplaintTrends(company, complaints) {
  const prompt = `Analyze these consumer complaints for ${company}:
  ${JSON.stringify(complaints)}
  
  Provide:
  1. Top 3 recurring issues
  2. Severity assessment (Low/Medium/High/Critical)
  3. Trend analysis (Improving/Stable/Worsening)
  4. Consumer recommendations
  
  Format as JSON.`;
  
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return JSON.parse(response.text());
}
```

#### 2. Natural Language Search

```javascript
async function naturalLanguageSearch(query, data) {
  const prompt = `User asked: "${query}"
  Available data: ${JSON.stringify(data)}
  
  Parse the query and return filtered data that answers their question.
  Return: { answer: string, relevantData: array, visualizationType: string }`;
  
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return JSON.parse(response.text());
}
```

#### 3. Fraud Pattern Detection

```javascript
async function detectFraudPatterns(ftcComplaints) {
  const prompt = `Analyze these FTC fraud complaints:
  ${JSON.stringify(ftcComplaints)}
  
  Identify:
  1. Emerging scam types
  2. Geographic hotspots
  3. Most vulnerable demographics
  4. Preventive recommendations`;
  
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}
```

#### 4. Consumer Protection Chatbot

```javascript
async function consumerAdviceBot(userQuestion, companyData) {
  const prompt = `User asks: "${userQuestion}"
  
  Context: ${JSON.stringify(companyData)}
  
  Provide personalized consumer advice based on complaint data.
  Be helpful, accurate, and warn about potential risks.`;
  
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}
```

## Error Handling

Always implement proper error handling:

```javascript
try {
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
} catch (error) {
  console.error('Gemini API error:', error);
  return 'Unable to process request at this time.';
}
```

## Rate Limits

- **CFPB**: No documented rate limits
- **NHTSA**: No documented rate limits
- **CPSC**: No documented rate limits
- **FTC**: 1000 requests per hour with DEMO_KEY
- **Gemini API**: Check your quota at https://makersuite.google.com/

## Best Practices

1. **Cache responses** - Don't fetch the same data repeatedly
2. **Handle errors gracefully** - Federal APIs can be slow or unavailable
3. **Respect rate limits** - Implement exponential backoff
4. **Validate API responses** - Data formats can vary
5. **Use environment variables** - Never commit API keys

## Resources

- [CFPB API Documentation](https://cfpb.github.io/api/ccdb/)
- [NHTSA API Documentation](https://www.nhtsa.gov/nhtsa-datasets-and-apis)
- [CPSC API Documentation](https://www.cpsc.gov/Recalls)
- [FTC API Documentation](https://api.ftc.gov/)
- [Google Gemini API Documentation](https://ai.google.dev/docs)
