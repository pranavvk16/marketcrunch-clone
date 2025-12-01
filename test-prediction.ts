import { generateStockPrediction } from './lib/prediction-engine';

async function testPrediction() {
  try {
    console.log("Testing stock prediction for AAPL...");
    const prediction = await generateStockPrediction('AAPL');
    console.log("Prediction success!");
    console.log("Symbol:", prediction.symbol);
    console.log("Target:", prediction.nextDayTarget);
    console.log("Confidence:", prediction.confidenceScore);
  } catch (error) {
    console.error("Prediction failed:", error);
  }
}

testPrediction();
