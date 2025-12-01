import { NextResponse } from 'next/server';
import { getGenerativeModel } from '@/lib/gemini';

export async function GET() {
  try {
    console.log('🏓 Testing Gemini API connection...');
    
    const model = getGenerativeModel("gemini-2.5-flash");
    
    const result = await model.generateContent("What is 2+2? Reply with just the number.");
    const text = result.response.text();
    
    console.log('✅ Gemini API test successful!');
    
    return NextResponse.json({
      success: true,
      message: 'Gemini API is working correctly!',
      testResult: text.trim(),
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Gemini API test failed:', error);
    return NextResponse.json({
      success: false,
      message: 'Gemini API test failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
