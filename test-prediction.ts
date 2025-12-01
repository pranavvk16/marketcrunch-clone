import { generateStockPrediction } from './lib/prediction-engine';

async function testPrediction() {
  try {
    const provider = (process.argv[2] as 'gemini' | 'openrouter') || 'gemini';
    console.log(`Testing stock prediction for AAPL using ${provider}...`);
    const prediction = await generateStockPrediction('AAPL', provider);
    console.log("Prediction success!");
    console.log("Symbol:", prediction.symbol);
    console.log("Target:", prediction.nextDayTarget);
    console.log("Confidence:", prediction.confidenceScore);
  } catch (error) {
    console.error("Prediction failed:", error);
  }
}

testPrediction();
