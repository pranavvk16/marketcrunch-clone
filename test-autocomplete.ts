
async function testAutocomplete() {
  console.log('🧪 Testing Stock Autocomplete...');

  try {
    // Test 1: Search for "App"
    console.log('\n1. Searching for "App"...');
    const res1 = await fetch('http://localhost:3000/api/search?query=App');
    
    if (res1.ok) {
      const data1 = await res1.json();
      console.log(`✅ Success! Found ${data1.results.length} suggestions.`);
      
      const apple = data1.results.find((s: any) => s.symbol === 'AAPL');
      if (apple) console.log('   (Found AAPL in results)');
      else console.warn('   (Warning: AAPL not found in results)');
      
      console.log('   Top result:', data1.results[0]);
    } else {
      console.error('❌ Failed:', await res1.text());
    }

    // Test 2: Search for "Tes"
    console.log('\n2. Searching for "Tes"...');
    const res2 = await fetch('http://localhost:3000/api/search?query=Tes');

    if (res2.ok) {
      const data2 = await res2.json();
      console.log(`✅ Success! Found ${data2.results.length} suggestions.`);
      const tesla = data2.results.find((s: any) => s.symbol === 'TSLA');
      if (tesla) console.log('   (Found TSLA in results)');
    } else {
      console.error('❌ Failed:', await res2.text());
    }

  } catch (error) {
    console.error('❌ Test failed with error:', error);
  }
}

testAutocomplete();
