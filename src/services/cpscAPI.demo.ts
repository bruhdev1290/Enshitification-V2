/**
 * CPSC Recall Retrieval API - Usage Examples
 * 
 * This file demonstrates how to use the CPSC API module to query
 * the Consumer Product Safety Commission's Recall Retrieval API.
 */

import { cpscAPI, CPSCQueryParams } from './cpscAPI';

// Example 1: Sample query for stroller recalls with pinch hazards
export const exampleStrollerPinchHazards = async () => {
  console.log('Example 1: Stroller recalls with pinch hazards');
  console.log('='.repeat(50));
  
  const result = await cpscAPI.getStrollerPinchHazards();
  
  if (result.success) {
    console.log(`✓ Success! Found ${result.recordCount} recalls`);
    console.log('Sample recalls:', result.data?.slice(0, 3));
  } else {
    console.error('✗ Error:', result.error);
  }
  
  return result;
};

// Example 2: Search recalls by title
export const exampleSearchByTitle = async (title: string = 'toy') => {
  console.log(`\nExample 2: Search recalls by title "${title}"`);
  console.log('='.repeat(50));
  
  const result = await cpscAPI.getRecallsByTitle(title);
  
  if (result.success) {
    console.log(`✓ Found ${result.recordCount} recalls`);
    result.data?.forEach((recall, index) => {
      if (index < 3) { // Show first 3
        console.log(`\nRecall ${index + 1}:`);
        console.log(`  - Title: ${recall.Title}`);
        console.log(`  - Date: ${recall.RecallDate}`);
        console.log(`  - Description: ${recall.Description?.substring(0, 100)}...`);
      }
    });
  } else {
    console.error('✗ Error:', result.error);
  }
  
  return result;
};

// Example 3: Search by hazard type
export const exampleSearchByHazard = async (hazard: string = 'fire') => {
  console.log(`\nExample 3: Search recalls by hazard "${hazard}"`);
  console.log('='.repeat(50));
  
  const result = await cpscAPI.getRecallsByHazard(hazard);
  
  if (result.success) {
    console.log(`✓ Found ${result.recordCount} recalls`);
    console.log('Hazard types found:', 
      result.data?.map(r => r.Hazards?.[0]?.Name).filter(Boolean).slice(0, 5)
    );
  } else {
    console.error('✗ Error:', result.error);
  }
  
  return result;
};

// Example 4: Search within date range
export const exampleSearchByDateRange = async () => {
  console.log('\nExample 4: Search recalls by date range (last 90 days)');
  console.log('='.repeat(50));
  
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 90);
  
  const result = await cpscAPI.getRecallsByDateRange(
    startDate.toISOString().split('T')[0],
    endDate.toISOString().split('T')[0]
  );
  
  if (result.success) {
    console.log(`✓ Found ${result.recordCount} recalls in the last 90 days`);
  } else {
    console.error('✗ Error:', result.error);
  }
  
  return result;
};

// Example 5: Advanced query with multiple parameters
export const exampleAdvancedQuery = async () => {
  console.log('\nExample 5: Advanced query with multiple parameters');
  console.log('='.repeat(50));
  
  const params: CPSCQueryParams = {
    RecallTitle: 'bike',
    Hazard: 'fall',
    RecallDateStart: '2023-01-01',
    RecallDateEnd: '2024-12-31',
    format: 'json'
  };
  
  const result = await cpscAPI.queryRecalls(params);
  
  if (result.success) {
    console.log(`✓ Found ${result.recordCount} bike recalls with fall hazards (2023-2024)`);
    console.log('Parameters used:', params);
  } else {
    console.error('✗ Error:', result.error);
  }
  
  return result;
};

// Example 6: XML format with fallback
export const exampleXMLQuery = async () => {
  console.log('\nExample 6: Query with XML format (will convert to JSON)');
  console.log('='.repeat(50));
  
  const result = await cpscAPI.queryRecallsXML({
    RecallTitle: 'battery',
    Hazard: 'fire'
  });
  
  if (result.success) {
    console.log(`✓ Successfully parsed XML response`);
    console.log(`✓ Found ${result.recordCount} battery recalls with fire hazard`);
  } else {
    console.error('✗ Error:', result.error);
  }
  
  return result;
};

// Example 7: Get recent recalls (last 30 days)
export const exampleRecentRecalls = async () => {
  console.log('\nExample 7: Get recent recalls (last 30 days)');
  console.log('='.repeat(50));
  
  const result = await cpscAPI.getRecentRecalls();
  
  if (result.success) {
    console.log(`✓ Found ${result.recordCount} recent recalls`);
    
    // Group by manufacturer
    const manufacturers = new Map<string, number>();
    result.data?.forEach(recall => {
      const mfg = recall.Manufacturers?.[0]?.Name || 'Unknown';
      manufacturers.set(mfg, (manufacturers.get(mfg) || 0) + 1);
    });
    
    console.log('\nTop manufacturers with recalls:');
    Array.from(manufacturers.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .forEach(([name, count]) => {
        console.log(`  - ${name}: ${count} recalls`);
      });
  } else {
    console.error('✗ Error:', result.error);
  }
  
  return result;
};

// Example 8: Error handling - invalid date format
export const exampleErrorHandling = async () => {
  console.log('\nExample 8: Error handling with invalid parameters');
  console.log('='.repeat(50));
  
  // This should return an error due to invalid date format
  const result = await cpscAPI.queryRecalls({
    RecallDateStart: '2024/01/01', // Invalid format
    RecallDateEnd: '2024-12-31'
  });
  
  if (!result.success) {
    console.log('✓ Error handling works correctly');
    console.log('Error message:', result.error);
  }
  
  return result;
};

// Example 9: Check API availability
export const exampleCheckAvailability = async () => {
  console.log('\nExample 9: Check CPSC API availability');
  console.log('='.repeat(50));
  
  const isAvailable = await cpscAPI.isAvailable();
  
  if (isAvailable) {
    console.log('✓ CPSC API is available and responding');
  } else {
    console.log('✗ CPSC API is not available or not responding');
  }
  
  return isAvailable;
};

// Main function to run all examples
export const runAllExamples = async () => {
  console.log('\n🎯 CPSC Recall Retrieval API - Examples\n');
  
  // Check API availability first
  await exampleCheckAvailability();
  
  // Run examples
  await exampleStrollerPinchHazards();
  await exampleSearchByTitle('toy');
  await exampleSearchByHazard('fire');
  await exampleSearchByDateRange();
  await exampleAdvancedQuery();
  await exampleXMLQuery();
  await exampleRecentRecalls();
  await exampleErrorHandling();
  
  console.log('\n✅ All examples completed!\n');
};

// Export for use in other modules
export default {
  exampleStrollerPinchHazards,
  exampleSearchByTitle,
  exampleSearchByHazard,
  exampleSearchByDateRange,
  exampleAdvancedQuery,
  exampleXMLQuery,
  exampleRecentRecalls,
  exampleErrorHandling,
  exampleCheckAvailability,
  runAllExamples
};
