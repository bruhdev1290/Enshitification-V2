# CPSC Recall Retrieval API Integration

## Overview

This module provides a TypeScript/JavaScript interface to query the **Consumer Product Safety Commission (CPSC)** Recall Retrieval API. It includes comprehensive error handling, parameter validation, XML/JSON support, and sample queries.

## Features

✅ **Full TypeScript support** with complete type definitions  
✅ **Parameter validation** for dates and query parameters  
✅ **Error handling** with detailed error messages  
✅ **JSON format support** (default)  
✅ **XML format support** with automatic conversion to JSON  
✅ **Sample queries** including "stroller" recalls with "pinch" hazards  
✅ **Date range filtering** with validation  
✅ **Multiple search parameters** (Title, Hazard, Date, Manufacturer, etc.)  
✅ **Utility functions** for date validation and URL building  

## API Base URL

```
https://www.saferproducts.gov/RestWebServices/Recall
```

## Installation

The module is already integrated into the project. Import it as follows:

```typescript
import { cpscAPI, CPSCQueryParams, CPSCRecall } from './services/cpscAPI';
```

## Quick Start

### Basic Usage

```typescript
// Get stroller recalls with pinch hazards (sample query)
const result = await cpscAPI.getStrollerPinchHazards();

if (result.success) {
  console.log(`Found ${result.recordCount} recalls`);
  console.log(result.data);
} else {
  console.error('Error:', result.error);
}
```

### Search by Title

```typescript
const result = await cpscAPI.getRecallsByTitle('bicycle');
```

### Search by Hazard

```typescript
const result = await cpscAPI.getRecallsByHazard('fire');
```

### Search by Date Range

```typescript
const result = await cpscAPI.getRecallsByDateRange(
  '2024-01-01',  // Start date
  '2024-12-31'   // End date
);
```

### Get Recent Recalls (Last 30 Days)

```typescript
const result = await cpscAPI.getRecentRecalls();
```

## Advanced Usage

### Custom Query with Multiple Parameters

```typescript
import { cpscAPI, CPSCQueryParams } from './services/cpscAPI';

const params: CPSCQueryParams = {
  RecallTitle: 'toy',
  Hazard: 'choking',
  RecallDateStart: '2024-01-01',
  RecallDateEnd: '2024-12-31',
  Manufacturer: 'Mattel',
  format: 'json'
};

const result = await cpscAPI.queryRecalls(params);
```

### XML Format with Automatic Conversion

```typescript
// Request XML format and automatically convert to JSON
const result = await cpscAPI.queryRecallsXML({
  RecallTitle: 'battery',
  Hazard: 'fire'
});

// The result will be in JSON format, parsed from XML
console.log(result.data);
```

### Check API Availability

```typescript
const isAvailable = await cpscAPI.isAvailable();

if (isAvailable) {
  console.log('CPSC API is available');
} else {
  console.log('CPSC API is not responding');
}
```

## TypeScript Interfaces

### CPSCQueryParams

```typescript
interface CPSCQueryParams {
  RecallTitle?: string;        // Keyword to search in recall titles
  Hazard?: string;             // Hazard type to filter by
  RecallDateStart?: string;    // Start date (YYYY-MM-DD)
  RecallDateEnd?: string;      // End date (YYYY-MM-DD)
  RecallNumber?: string;       // Specific recall number
  RecallID?: number;           // Specific recall ID
  Manufacturer?: string;       // Manufacturer name
  ProductType?: string;        // Product type/category
  format?: 'json' | 'xml';     // Response format (default: json)
}
```

### CPSCRecall

```typescript
interface CPSCRecall {
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
```

### CPSCRecallResponse

```typescript
interface CPSCRecallResponse {
  data?: CPSCRecall[];      // Array of recall objects
  error?: string;           // Error message if request failed
  success: boolean;         // Whether the request succeeded
  recordCount?: number;     // Number of records returned
}
```

## Query Parameters

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `RecallTitle` | string | Search keyword in recall titles | "stroller" |
| `Hazard` | string | Filter by hazard type | "pinch", "fire", "fall" |
| `RecallDateStart` | string | Start date for date range filter | "2024-01-01" |
| `RecallDateEnd` | string | End date for date range filter | "2024-12-31" |
| `RecallNumber` | string | Specific recall number | "24-123" |
| `RecallID` | number | Specific recall ID | 12345 |
| `Manufacturer` | string | Filter by manufacturer name | "Mattel" |
| `ProductType` | string | Filter by product type | "Toys" |
| `format` | string | Response format: "json" or "xml" | "json" |

## Error Handling

The module includes comprehensive error handling:

```typescript
const result = await cpscAPI.queryRecalls({
  RecallDateStart: '2024/01/01',  // Invalid format
  RecallDateEnd: '2024-12-31'
});

if (!result.success) {
  console.error('Error:', result.error);
  // Output: "Invalid RecallDateStart format. Use YYYY-MM-DD"
}
```

### Common Errors

1. **Invalid Date Format**: Dates must be in YYYY-MM-DD format
2. **Invalid Date Range**: Start date must be before end date
3. **Invalid Format**: Format must be "json" or "xml"
4. **API Error**: Network or server errors

## Parameter Validation

The module validates all parameters before making API requests:

- ✅ Date format validation (YYYY-MM-DD)
- ✅ Date range validation (start < end)
- ✅ Format validation (json/xml)
- ✅ Automatic error messages for invalid inputs

## XML to JSON Conversion

The module includes a utility to convert XML responses to JSON:

```typescript
import { cpscUtils } from './services/cpscAPI';

const xmlString = '<Recall><Title>Example</Title></Recall>';
const jsonData = cpscUtils.parseXMLToJSON(xmlString);
```

This is automatically used when:
1. You request XML format explicitly
2. The API returns XML instead of JSON
3. You use the `queryRecallsXML()` method

## Sample Queries

### 1. Stroller Recalls with Pinch Hazards

```typescript
const result = await cpscAPI.getStrollerPinchHazards();
```

### 2. Toy Recalls in 2024

```typescript
const result = await cpscAPI.queryRecalls({
  RecallTitle: 'toy',
  RecallDateStart: '2024-01-01',
  RecallDateEnd: '2024-12-31'
});
```

### 3. Fire Hazard Recalls

```typescript
const result = await cpscAPI.getRecallsByHazard('fire');
```

### 4. Recent Recalls (Last 30 Days)

```typescript
const result = await cpscAPI.getRecentRecalls();
```

### 5. Manufacturer-Specific Recalls

```typescript
const result = await cpscAPI.queryRecalls({
  Manufacturer: 'Mattel',
  RecallDateStart: '2023-01-01'
});
```

## Running the Examples

A comprehensive example file is provided at `src/services/cpscAPI.demo.ts`:

```typescript
import { runAllExamples } from './services/cpscAPI.demo';

// Run all examples
await runAllExamples();
```

Individual examples:

```typescript
import cpscExamples from './services/cpscAPI.demo';

// Run specific example
await cpscExamples.exampleStrollerPinchHazards();
await cpscExamples.exampleSearchByTitle('toy');
await cpscExamples.exampleSearchByHazard('fire');
```

## API Methods

### Core Methods

| Method | Parameters | Description |
|--------|------------|-------------|
| `queryRecalls()` | `CPSCQueryParams` | Main query method with all parameters |
| `getRecallsByTitle()` | `title: string` | Search by title keyword |
| `getRecallsByHazard()` | `hazard: string` | Search by hazard type |
| `getRecallsByDateRange()` | `startDate, endDate` | Search within date range |
| `getStrollerPinchHazards()` | none | Sample query for strollers with pinch hazards |
| `getRecentRecalls()` | none | Get recalls from last 30 days |
| `isAvailable()` | none | Check if API is responding |
| `queryRecallsXML()` | `CPSCQueryParams` | Query with XML format |

### Utility Methods

```typescript
import { cpscUtils } from './services/cpscAPI';

// Validate date format
const isValid = cpscUtils.validateDate('2024-01-01');

// Validate all parameters
const validation = cpscUtils.validateParams(params);

// Parse XML to JSON
const jsonData = cpscUtils.parseXMLToJSON(xmlString);

// Build query URL
const url = cpscUtils.buildQueryURL(params);
```

## Integration with Existing Code

The CPSC API module follows the same pattern as other API services in the project:

```typescript
// Similar to cfpbAPI, nhtsaAPI, and ftcAPI
import { cpscAPI } from './services/cpscAPI';
import { cfpbAPI } from './services/cfpbAPI';
import { nhtsaAPI } from './services/nhtsaAPI';
import { ftcAPI } from './services/ftcAPI';

// Use them consistently
const cpscData = await cpscAPI.getRecentRecalls();
const cfpbData = await cfpbAPI.getRecentComplaints();
const nhtsaData = await nhtsaAPI.getRecentRecalls();
```

## Best Practices

1. **Always check `result.success`** before accessing data
2. **Handle errors gracefully** with user-friendly messages
3. **Use TypeScript types** for better IDE support and type safety
4. **Validate dates** using the YYYY-MM-DD format
5. **Use appropriate date ranges** to avoid timeouts
6. **Cache results** when appropriate to reduce API calls
7. **Check API availability** before making multiple requests

## Performance Tips

- Use specific query parameters to reduce response size
- Implement result caching for frequently accessed data
- Use date ranges to limit results
- Consider pagination for large result sets

## Troubleshooting

### API not responding
```typescript
const isAvailable = await cpscAPI.isAvailable();
if (!isAvailable) {
  console.log('CPSC API is currently unavailable');
}
```

### Invalid parameters
```typescript
const validation = cpscUtils.validateParams(params);
if (!validation.valid) {
  console.error('Parameter error:', validation.error);
}
```

### Date format issues
```typescript
// ✅ Correct
RecallDateStart: '2024-01-01'

// ❌ Wrong
RecallDateStart: '01/01/2024'
RecallDateStart: '2024/01/01'
```

## Support

For issues or questions:
- Check the [CPSC API Documentation](https://www.saferproducts.gov/RestWebServices/)
- Review the examples in `cpscAPI.demo.ts`
- Open an issue on the GitHub repository

## License

This module is part of the Enshitification Portal project and is licensed under the MIT License.

---

**Made for consumer protection and transparency** 🛡️

*Version 1.0.0 - CPSC Recall Retrieval API Integration*
