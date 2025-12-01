
import { 
    getRecommendationsBySymbol, 
    getScreener, 
    getTrendingSymbols, 
    getChart, 
    getFundamentalsTimeSeries, 
    getHistorical, 
    getInsights, 
    getOptions, 
    getQuote, 
    getQuoteSummary 
} from './lib/yahoo-finance';

async function testYahooModules() {
    console.log('🧪 Testing Yahoo Finance Modules...\n');

    const symbol = 'AAPL';

    console.log(`1. getQuote(${symbol})`);
    const quote = await getQuote(symbol);
    console.log(quote ? '✅ Success' : '❌ Failed');

    console.log(`\n2. getRecommendationsBySymbol(${symbol})`);
    const recs = await getRecommendationsBySymbol(symbol);
    console.log(recs ? '✅ Success' : '❌ Failed (or not available)');

    console.log(`\n3. getTrendingSymbols('US')`);
    const trending = await getTrendingSymbols('US');
    console.log(trending ? '✅ Success' : '❌ Failed');

    console.log(`\n4. getChart(${symbol})`);
    const chart = await getChart(symbol);
    console.log(chart ? '✅ Success' : '❌ Failed');

    console.log(`\n5. getHistorical(${symbol})`);
    const historical = await getHistorical(symbol, { period1: '2024-11-01', period2: '2024-11-05' });
    console.log(historical ? '✅ Success' : '❌ Failed');

    console.log(`\n6. getQuoteSummary(${symbol})`);
    const summary = await getQuoteSummary(symbol);
    console.log(summary ? '✅ Success' : '❌ Failed');
    
    console.log(`\n7. getOptions(${symbol})`);
    const options = await getOptions(symbol);
    console.log(options ? '✅ Success' : '❌ Failed');

    // Note: Some modules like insights or fundamentalsTimeSeries might require specific permissions or data availability
    console.log(`\n8. getInsights(${symbol})`);
    const insights = await getInsights(symbol);
    console.log(insights ? '✅ Success' : '❌ Failed (might be restricted)');

}

testYahooModules();
