
async function testDashboardApi() {
  console.log('🧪 Testing Dashboard API...');

  try {
    // Test Ping first
    // console.log('Testing /api/ping...');
    // const pingRes = await fetch('http://localhost:3000/api/ping');
    // console.log(`Ping Status: ${pingRes.status}`);
    // if (!pingRes.ok) console.log(await pingRes.text());

    const ticker = 'AAPL';
    console.log(`\nFetching data for ${ticker}...`);
    
    const res = await fetch(`http://localhost:3000/api/dashboard-data?ticker=${ticker}`);
    console.log(`Dashboard Status: ${res.status}`);
    
    if (res.ok) {
      const data = await res.json();
      console.log('✅ Success! Received data structure:');
      console.log('  - Quote:', data.quote ? 'OK' : 'Missing');
      console.log('  - Chart:', data.chart ? 'OK' : 'Missing');
      console.log('  - Insights:', data.insights ? 'OK' : 'Missing');
      console.log('  - Recommendations:', data.recommendations ? 'OK' : 'Missing');
      console.log('  - Summary:', data.summary ? 'OK' : 'Missing');
      console.log('  - Options:', data.options ? 'OK' : 'Missing');
      console.log('  - Fundamentals:', data.fundamentals ? 'OK' : 'Missing');
    } else {
      console.error('❌ Failed:', await res.text());
    }

  } catch (error) {
    console.error('❌ Test failed with error:', error);
  }
}

testDashboardApi();
