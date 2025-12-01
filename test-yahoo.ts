import YahooFinance from 'yahoo-finance2';

const yahooFinance = new YahooFinance();

async function test() {
  try {
    console.log('Fetching AAPL...');
    const quote = await yahooFinance.quote('AAPL');
    console.log('Success:', quote);
  } catch (error) {
    console.error('Error:', error);
  }
}

test();
