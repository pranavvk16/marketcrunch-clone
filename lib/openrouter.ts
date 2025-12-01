import { OpenRouter } from "@openrouter/sdk";
import { StockPrediction } from "./prediction-engine";

const apiKey = process.env.OPENROUTER_API_KEY;

const openrouter = new OpenRouter({
  apiKey: apiKey,
});

export async function generateOpenRouterPrediction(ticker: string, stockData: any): Promise<StockPrediction> {
  if (!apiKey) {
    throw new Error("OPENROUTER_API_KEY is not set");
  }

  const prompt = `
You are a senior quantitative financial analyst for MarketCrunch AI.
Analyze the stock ticker: ${ticker} (${stockData.name})
Current Price: $${stockData.currentPrice}
Sector: ${stockData.sector}

Provide a comprehensive predictive analysis in strictly valid JSON format.
Do not include any markdown formatting (like \`\`\`json). Just the raw JSON object.

The JSON must match this schema:
{
  "symbol": "string",
  "currentPrice": "string ($XXX.XX)",
  "nextDayTarget": "string ($XXX.XX)",
  "nextDayChangePercent": "string (+/-X.XX%)",
  "weeklyMin": "string ($XXX.XX)",
  "weeklyMax": "string ($XXX.XX)",
  "confidenceScore": number (0-100),
  "riskLevel": "Low" | "Medium" | "High" | "Extreme",
  "volatilityScore": number (0-100),
  "trend": "Bullish" | "Bearish" | "Neutral",
  "momentumScore": number (0-100),
  "explanation": "string (2-3 sentences)",
  "sentiment": "string",
  "sentimentReason": "string",
  "backtestWinRate": "string (XX%)",
  "backtestSharpe": "string (X.XX)",
  "technicalSignals": [
    { "signal": "string", "type": "Bullish" | "Bearish" }
  ]
}

Ensure all fields are present and correctly typed.
`;

  try {
    const completion = await openrouter.chat.send({
      model: "x-ai/grok-4.1-fast:free",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const content = completion.choices[0]?.message?.content;

    if (!content) {
      throw new Error("No content received from OpenRouter");
    }

    // Clean up potential markdown code blocks if the model ignores instructions
    const cleanContent = (typeof content === 'string' ? content : JSON.stringify(content)).replace(/```json\n?|\n?```/g, "").trim();

    const prediction: StockPrediction = JSON.parse(cleanContent);
    return prediction;

  } catch (error) {
    console.error("OpenRouter prediction error:", error);
    throw error;
  }
}
