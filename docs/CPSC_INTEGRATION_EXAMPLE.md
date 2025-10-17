# CPSC API Integration Example

This document shows how the new CPSC API module integrates with the existing API services in the Enshitification Portal.

## Quick Integration

The CPSC API follows the same pattern as the existing API services (CFPB, NHTSA, FTC), making it easy to integrate into your application.

### Import All API Services

```typescript
// Import all API services together
import { cfpbAPI } from './services/cfpbAPI';
import { nhtsaAPI } from './services/nhtsaAPI';
import { ftcAPI } from './services/ftcAPI';
import { cpscAPI } from './services/cpscAPI';  // ← New!
```

### Using Multiple APIs Together

```typescript
// Fetch data from all four federal agencies
async function fetchAllAgencyData() {
  // Consumer Financial Protection Bureau
  const cfpbData = await cfpbAPI.getRecentComplaints(50);
  
  // National Highway Traffic Safety Administration
  const nhtsaData = await nhtsaAPI.getRecentRecalls();
  
  // Federal Trade Commission
  const ftcData = await ftcAPI.getRecentFraudComplaints(50);
  
  // Consumer Product Safety Commission (NEW!)
  const cpscData = await cpscAPI.getRecentRecalls();
  
  return {
    financial: cfpbData,
    automotive: nhtsaData,
    fraud: ftcData,
    products: cpscData  // Consumer product recalls
  };
}
```

### Example: Search Across All Agencies

```typescript
async function searchAllAgencies(keyword: string) {
  console.log(`Searching for: ${keyword}`);
  
  // Search CFPB for complaints
  const complaints = await cfpbAPI.searchComplaints(keyword);
  console.log(`CFPB: ${complaints?.hits?.hits?.length || 0} complaints`);
  
  // Search NHTSA for vehicle recalls
  const vehicleRecalls = await nhtsaAPI.searchRecalls(keyword);
  console.log(`NHTSA: ${vehicleRecalls?.results?.length || 0} vehicle recalls`);
  
  // Search FTC for fraud reports
  const fraudReports = await ftcAPI.searchFraudReports(keyword);
  console.log(`FTC: ${fraudReports?.data?.length || 0} fraud reports`);
  
  // Search CPSC for product recalls (NEW!)
  const productRecalls = await cpscAPI.getRecallsByTitle(keyword);
  console.log(`CPSC: ${productRecalls?.recordCount || 0} product recalls`);
  
  return {
    complaints,
    vehicleRecalls,
    fraudReports,
    productRecalls
  };
}

// Example usage
searchAllAgencies('toyota');
```

### Example: Dashboard Statistics

```typescript
async function getDashboardStats() {
  // Fetch recent data from all agencies
  const [cfpb, nhtsa, ftc, cpsc] = await Promise.all([
    cfpbAPI.getRecentComplaints(100),
    nhtsaAPI.getRecentRecalls(),
    ftcAPI.getRecentFraudComplaints(100),
    cpscAPI.getRecentRecalls()  // NEW!
  ]);
  
  return {
    stats: {
      complaints: cfpb?.hits?.hits?.length || 0,
      vehicleRecalls: nhtsa?.results?.length || 0,
      fraudReports: ftc?.data?.length || 0,
      productRecalls: cpsc?.recordCount || 0  // NEW!
    },
    totalIssues: (
      (cfpb?.hits?.hits?.length || 0) +
      (nhtsa?.results?.length || 0) +
      (ftc?.data?.length || 0) +
      (cpsc?.recordCount || 0)  // NEW!
    )
  };
}
```

### Example: Company Risk Assessment

```typescript
async function assessCompanyRisk(companyName: string) {
  console.log(`\n🔍 Risk Assessment for: ${companyName}\n`);
  
  // Check financial complaints
  const financial = await cfpbAPI.searchComplaints(companyName);
  const financialCount = financial?.hits?.hits?.length || 0;
  
  // Check product recalls
  const products = await cpscAPI.getRecallsByTitle(companyName);
  const productsCount = products?.recordCount || 0;
  
  // Calculate risk score
  const riskScore = financialCount + (productsCount * 2); // Recalls weighted 2x
  
  let riskLevel = 'Low';
  if (riskScore > 50) riskLevel = 'Critical';
  else if (riskScore > 20) riskLevel = 'High';
  else if (riskScore > 5) riskLevel = 'Medium';
  
  console.log(`Financial Complaints: ${financialCount}`);
  console.log(`Product Recalls: ${productsCount}`);
  console.log(`Risk Score: ${riskScore}`);
  console.log(`Risk Level: ${riskLevel}`);
  
  return {
    company: companyName,
    financialComplaints: financialCount,
    productRecalls: productsCount,
    riskScore,
    riskLevel
  };
}

// Example usage
assessCompanyRisk('Fisher-Price');
```

### Example: Safety Alert System

```typescript
async function checkSafetyAlerts() {
  // Get recent product recalls from CPSC
  const recalls = await cpscAPI.getRecentRecalls();
  
  if (recalls.success && recalls.data) {
    console.log('\n⚠️  Recent Safety Alerts\n');
    
    recalls.data.slice(0, 5).forEach((recall, index) => {
      console.log(`${index + 1}. ${recall.Title}`);
      console.log(`   Date: ${recall.RecallDate}`);
      console.log(`   Hazard: ${recall.Hazards?.[0]?.Name || 'N/A'}`);
      console.log(`   Manufacturer: ${recall.Manufacturers?.[0]?.Name || 'N/A'}`);
      console.log('');
    });
  }
}
```

### Example: Hazard Monitoring

```typescript
async function monitorHazards() {
  const hazardTypes = ['fire', 'choking', 'fall', 'pinch', 'burn'];
  
  console.log('\n🔥 Hazard Monitoring Dashboard\n');
  
  for (const hazard of hazardTypes) {
    const result = await cpscAPI.getRecallsByHazard(hazard);
    console.log(`${hazard.toUpperCase()}: ${result.recordCount || 0} recalls`);
  }
}
```

### Example: Product Category Analysis

```typescript
async function analyzeProductCategories() {
  const categories = [
    { name: 'Toys', keywords: ['toy', 'doll', 'game'] },
    { name: 'Furniture', keywords: ['furniture', 'chair', 'table'] },
    { name: 'Electronics', keywords: ['battery', 'charger', 'electronic'] },
    { name: 'Baby Products', keywords: ['stroller', 'crib', 'baby'] }
  ];
  
  console.log('\n📊 Product Category Recall Analysis\n');
  
  for (const category of categories) {
    let totalRecalls = 0;
    
    for (const keyword of category.keywords) {
      const result = await cpscAPI.getRecallsByTitle(keyword);
      totalRecalls += result.recordCount || 0;
    }
    
    console.log(`${category.name}: ${totalRecalls} recalls`);
  }
}
```

## React Component Example

Here's how to use the CPSC API in a React component alongside other APIs:

```typescript
import React, { useState, useEffect } from 'react';
import { cpscAPI, CPSCRecall } from './services/cpscAPI';

const ProductRecallsComponent: React.FC = () => {
  const [recalls, setRecalls] = useState<CPSCRecall[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchRecalls = async () => {
      setLoading(true);
      setError(null);
      
      const result = await cpscAPI.getRecentRecalls();
      
      if (result.success) {
        setRecalls(result.data || []);
      } else {
        setError(result.error || 'Failed to fetch recalls');
      }
      
      setLoading(false);
    };
    
    fetchRecalls();
  }, []);
  
  if (loading) return <div>Loading product recalls...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div className="product-recalls">
      <h2>Recent Product Recalls</h2>
      <p>Showing {recalls.length} recent recalls from CPSC</p>
      
      {recalls.map((recall) => (
        <div key={recall.RecallID} className="recall-card">
          <h3>{recall.Title}</h3>
          <p>{recall.Description}</p>
          <div className="recall-meta">
            <span>Date: {recall.RecallDate}</span>
            <span>Manufacturer: {recall.Manufacturers?.[0]?.Name}</span>
            <span>Hazard: {recall.Hazards?.[0]?.Name}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductRecallsComponent;
```

## API Comparison

| API | Purpose | Sample Method |
|-----|---------|---------------|
| **CFPB** | Financial complaints | `cfpbAPI.searchComplaints('bank')` |
| **NHTSA** | Vehicle recalls | `nhtsaAPI.searchRecalls('airbag')` |
| **FTC** | Fraud reports | `ftcAPI.searchFraudReports('scam')` |
| **CPSC** | Product recalls | `cpscAPI.getRecallsByTitle('toy')` |

## Consistent Error Handling

All APIs follow similar error handling patterns:

```typescript
async function fetchWithErrorHandling() {
  try {
    const result = await cpscAPI.queryRecalls({
      RecallTitle: 'bicycle'
    });
    
    if (result.success) {
      console.log('Data:', result.data);
    } else {
      console.error('API Error:', result.error);
    }
  } catch (error) {
    console.error('Network Error:', error);
  }
}
```

## Next Steps

1. **Add CPSC to your dashboard**: Integrate product recalls alongside other data sources
2. **Create alerts**: Monitor specific hazards or product types
3. **Build analytics**: Analyze recall trends by manufacturer or category
4. **Enhance search**: Include CPSC results in your search functionality

## Additional Resources

- [CPSC API Documentation](./CPSC_API_INTEGRATION.md)
- [CPSC API Examples](../src/services/cpscAPI.demo.ts)
- [Main README](../README.md)

---

**The Enshitification Portal now supports all 4 major federal consumer protection agencies!** 🛡️
