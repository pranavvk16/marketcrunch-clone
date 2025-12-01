# MarketCrunch AI

AI-powered stock prediction platform with daily/weekly forecasts, explainable AI, and backtesting metrics for 25 popular stocks.

## Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure API Key**
   
   Create a `.env.local` file in the root directory:
   ```bash
   GEMINI_API_KEY=your_gemini_api_key_here
   ```
   
   Get your Gemini API key from: https://ai.google.dev/

3. **Run the Application**
   
   ```bash
   npm run dev
   ```
   
   The app will start on http://localhost:3000 with API routes automatically available at `/api/*`

4. **Access the Dashboard**
   
   Open your browser and navigate to:
   ```
   http://localhost:3000/dashboard
   ```

5. **Test AI Connection**
   
   Click the "Test AI" button in the navbar to verify your Gemini API key is working correctly.

## Features

- ✅ **25 Popular Stocks** - Tech, Financials, Healthcare, Consumer, Energy, and ETFs
- ✅ **AI-Powered Predictions** - Using Gemini 2.0 Flash
- ✅ **Daily & Weekly Forecasts** - Next-day targets and weekly price ranges
- ✅ **Explainable AI (XAI)** - Plain-English explanations of predictions
- ✅ **Backtesting Metrics** - Win rates, Sharpe ratios, and alpha
- ✅ **Risk Analysis** - Volatility scores and risk levels
- ✅ **Confidence Scoring** - Uncertainty quantification (0-100)
- ✅ **Technical Signals** - RSI, MACD, trend indicators
- ✅ **Test AI Button** - Quick ping test in navbar to verify Gemini API connection

## Architecture

- **Framework**: Next.js 16 (App Router)
- **Frontend**: React 19
- **AI**: Google Gemini 2.0 Flash with structured JSON output
- **Styling**: Tailwind CSS (via CDN)
- **API Routes**: Next.js built-in API routes (`/app/api/*`)

## API Endpoints

All endpoints are automatically handled by Next.js:

- `GET /api/ping` - Test Gemini AI connection
- `GET /api/stocks` - List all 25 available stocks
- `POST /api/analyze` - Generate AI prediction for a specific stock
- `GET /api/forecast/:ticker` - Get cached prediction for a ticker

## Stock Universe

**Technology**: AAPL, MSFT, GOOGL, AMZN, NVDA, META, TSLA, AMD  
**Financials**: JPM, BAC, GS, V  
**Consumer**: WMT, DIS, NKE, COST  
**Healthcare**: JNJ, PFE, UNH  
**Energy**: XOM, CVX  
**ETFs**: SPY, QQQ, DIA, IWM

## Development

- `npm run dev` - Start Next.js development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run linting

## Environment Variables

- `GEMINI_API_KEY` - Your Gemini API key (required)

## Troubleshooting

If you get "API key not set" errors:
1. Make sure you have a `.env.local` file in the root directory
2. Verify the environment variable is named exactly `GEMINI_API_KEY`
3. Restart the development server after changing `.env.local`
4. Click "Test AI" button in navbar to verify the connection

## License

MIT
