
async function testSearch() {
  console.log('🧪 Testing Stock Search...');

  try {
    // Test 1: Search for "Apple"
    console.log('\n1. Searching for "Apple"...');
    const res1 = await fetch('http://localhost:3000/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ symbol: 'Apple' })
    });
    
    if (res1.ok) {
      const data1 = await res1.json();
      console.log('✅ Success! Found ticker:', data1.symbol);
      if (data1.symbol === 'AAPL') console.log('   (Correctly resolved to AAPL)');
      else console.warn('   (Warning: Expected AAPL)');
    } else {
      console.error('❌ Failed:', await res1.text());
    }

    // Test 2: Search for arbitrary stock "PLTR"
    console.log('\n2. Searching for "PLTR"...');
    const res2 = await fetch('http://localhost:3000/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ symbol: 'PLTR' })
    });

    if (res2.ok) {
      const data2 = await res2.json();
      console.log('✅ Success! Found ticker:', data2.symbol);
    } else {
      console.error('❌ Failed:', await res2.text());
    }

  } catch (error) {
    console.error('❌ Test failed with error:', error);
  }
}

testSearch();
