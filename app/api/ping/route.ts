import { NextResponse } from 'next/server';
import { getGenerativeModel } from '@/lib/gemini';
import { OpenRouter } from "@openrouter/sdk";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const provider = searchParams.get('provider') || 'gemini';

    console.log(`🏓 Testing ${provider} API connection...`);

    let testResult = "";

    if (provider === 'openrouter') {
      const openrouter = new OpenRouter({ apiKey: process.env.OPENROUTER_API_KEY });
      const completion = await openrouter.chat.send({
        model: process.env.OPENROUTER_MODEL ,
        messages: [{ role: "user", content: "2+2=" }],
      });
      const content = completion.choices[0]?.message?.content;
      testResult = typeof content === 'string' ? content : "No response";
    } else {
      const model = getGenerativeModel("gemini-2.5-flash");
      const result = await model.generateContent("What is 2+2? Reply with just the number.");
      testResult = result.response.text();
    }
    
    console.log(`✅ ${provider} API test successful!`);
    
    return NextResponse.json({
      success: true,
      message: `${provider} API is working correctly!`,
      testResult: testResult.trim(),
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ API test failed:', error);
    return NextResponse.json({
      success: false,
      message: 'API test failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
