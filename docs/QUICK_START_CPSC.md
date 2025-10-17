# Quick Start Guide: CPSC Recall API

Get started with the CPSC Recall Retrieval API in less than 5 minutes.

## 🚀 Installation

The CPSC API module is already included in the project. Just import it:

```typescript
import { cpscAPI } from './services/cpscAPI';
```

## ⚡ Quick Examples

### 1. Sample Query (Stroller + Pinch Hazards)

```typescript
// This is the exact sample query from the requirements
const result = await cpscAPI.getStrollerPinchHazards();

if (result.success) {
  console.log(`Found ${result.recordCount} stroller recalls with pinch hazards`);
}
```

### 2. Search by Product Title

```typescript
const toyRecalls = await cpscAPI.getRecallsByTitle('toy');

if (toyRecalls.success) {
  toyRecalls.data?.forEach(recall => {
    console.log(recall.Title);
  });
}
```

### 3. Search by Hazard Type

```typescript
const fireHazards = await cpscAPI.getRecallsByHazard('fire');

if (fireHazards.success) {
  console.log(`Found ${fireHazards.recordCount} fire-related recalls`);
}
```

### 4. Search by Date Range

```typescript
const recentRecalls = await cpscAPI.getRecallsByDateRange(
  '2024-01-01',  // Start date
  '2024-12-31'   // End date
);

if (recentRecalls.success) {
  console.log(`Found ${recentRecalls.recordCount} recalls in 2024`);
}
```

### 5. Get Recent Recalls (Last 30 Days)

```typescript
const recent = await cpscAPI.getRecentRecalls();

if (recent.success) {
  console.log(`Found ${recent.recordCount} recalls in the last 30 days`);
}
```

### 6. Advanced Query with Multiple Parameters

```typescript
const result = await cpscAPI.queryRecalls({
  RecallTitle: 'bicycle',
  Hazard: 'fall',
  RecallDateStart: '2023-01-01',
  RecallDateEnd: '2024-12-31',
  format: 'json'
});

if (result.success) {
  console.log(`Found ${result.recordCount} bicycle recalls with fall hazards`);
}
```

## 📋 Common Use Cases

### Check if API is Available

```typescript
const isAvailable = await cpscAPI.isAvailable();

if (isAvailable) {
  // Proceed with queries
  const recalls = await cpscAPI.getRecentRecalls();
} else {
  console.log('CPSC API is currently unavailable');
}
```

### Search and Display Results

```typescript
const result = await cpscAPI.getRecallsByTitle('furniture');

if (result.success && result.data) {
  console.log(`\n📊 Found ${result.recordCount} furniture recalls:\n`);
  
  result.data.forEach((recall, index) => {
    console.log(`${index + 1}. ${recall.Title}`);
    console.log(`   Date: ${recall.RecallDate}`);
    console.log(`   Hazard: ${recall.Hazards?.[0]?.Name || 'N/A'}`);
    console.log('');
  });
}
```

### Handle Errors Gracefully

```typescript
const result = await cpscAPI.queryRecalls({
  RecallDateStart: '2024/01/01',  // Wrong format!
  RecallDateEnd: '2024-12-31'
});

if (!result.success) {
  console.error('Error:', result.error);
  // Output: "Invalid RecallDateStart format. Use YYYY-MM-DD"
}
```

## 🎯 TypeScript Support

The API is fully typed for TypeScript projects:

```typescript
import { 
  cpscAPI, 
  CPSCRecall, 
  CPSCQueryParams, 
  CPSCRecallResponse 
} from './services/cpscAPI';

// Type-safe query parameters
const params: CPSCQueryParams = {
  RecallTitle: 'stroller',
  Hazard: 'pinch',
  format: 'json'
};

// Type-safe response
const result: CPSCRecallResponse = await cpscAPI.queryRecalls(params);

// Type-safe recall data
const recalls: CPSCRecall[] = result.data || [];
```

## 🔧 Available Methods

| Method | Description | Example |
|--------|-------------|---------|
| `queryRecalls(params)` | Main query method | `queryRecalls({ RecallTitle: 'toy' })` |
| `getRecallsByTitle(title)` | Search by title | `getRecallsByTitle('bicycle')` |
| `getRecallsByHazard(hazard)` | Search by hazard | `getRecallsByHazard('fire')` |
| `getRecallsByDateRange(start, end)` | Date range search | `getRecallsByDateRange('2024-01-01', '2024-12-31')` |
| `getStrollerPinchHazards()` | Sample query | `getStrollerPinchHazards()` |
| `getRecentRecalls()` | Last 30 days | `getRecentRecalls()` |
| `isAvailable()` | Check API status | `isAvailable()` |
| `queryRecallsXML(params)` | Query with XML | `queryRecallsXML({ RecallTitle: 'toy' })` |

## 📝 Query Parameters

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `RecallTitle` | string | Search in titles | "stroller" |
| `Hazard` | string | Filter by hazard | "pinch", "fire" |
| `RecallDateStart` | string | Start date (YYYY-MM-DD) | "2024-01-01" |
| `RecallDateEnd` | string | End date (YYYY-MM-DD) | "2024-12-31" |
| `Manufacturer` | string | Manufacturer name | "Mattel" |
| `format` | 'json' \| 'xml' | Response format | "json" |

## ⚠️ Error Handling

All methods return a `CPSCRecallResponse` object with:

```typescript
{
  success: boolean;    // Whether the request succeeded
  data?: CPSCRecall[]; // Array of recall objects (if successful)
  error?: string;      // Error message (if failed)
  recordCount?: number;// Number of records returned
}
```

Always check `result.success` before accessing `result.data`:

```typescript
const result = await cpscAPI.getRecallsByTitle('toy');

if (result.success) {
  // Safe to access result.data
  console.log(result.data);
} else {
  // Handle error
  console.error(result.error);
}
```

## 🔗 Next Steps

- **Full Documentation**: [CPSC API Integration Guide](./CPSC_API_INTEGRATION.md)
- **Integration Examples**: [CPSC Integration Examples](./CPSC_INTEGRATION_EXAMPLE.md)
- **Usage Examples**: See `src/services/cpscAPI.demo.ts` for 9 detailed examples
- **Implementation Details**: [Implementation Summary](./CPSC_IMPLEMENTATION_SUMMARY.md)

## 💡 Tips

1. **Date Format**: Always use YYYY-MM-DD format for dates
2. **Error Handling**: Always check `result.success` before accessing data
3. **Type Safety**: Use TypeScript interfaces for better IDE support
4. **Performance**: Use specific parameters to limit result size
5. **Availability**: Check `isAvailable()` before making multiple requests

## 🎉 You're Ready!

That's it! You now have everything you need to start querying the CPSC Recall API. For more advanced usage, check out the full documentation.

---

**Questions?** Check the [main documentation](./CPSC_API_INTEGRATION.md) or review the [example code](../src/services/cpscAPI.demo.ts).
