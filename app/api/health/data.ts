import { NextRequest, NextResponse } from 'next/server';

// Simple in-memory storage (replace with database for production)
let healthData: Record<string, any> = {};

/**
 * GET /api/health/data - Retrieve latest health data
 */
export async function GET(request: NextRequest) {
  return NextResponse.json(healthData || {}, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
  });
}

/**
 * POST /api/health/data - Save health data from Apple Watch via Shortcut
 * Body: { heartRate, steps, calories, activity, sleepHours, deepSleep, timestamp }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate and save
    if (body.heartRate !== undefined) healthData.heartRate = body.heartRate;
    if (body.steps !== undefined) healthData.steps = body.steps;
    if (body.calories !== undefined) healthData.calories = body.calories;
    if (body.activity !== undefined) healthData.activity = body.activity;
    if (body.sleepHours !== undefined) healthData.sleepHours = body.sleepHours;
    if (body.deepSleep !== undefined) healthData.deepSleep = body.deepSleep;
    if (body.timestamp) healthData.lastUpdate = body.timestamp;

    console.log('[Health API] Data saved:', healthData);

    return NextResponse.json(
      { success: true, data: healthData },
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('[Health API] Error:', error);
    return NextResponse.json(
      { error: 'Fehler beim Speichern', success: false },
      { status: 500 }
    );
  }
}

/**
 * OPTIONS - Handle CORS preflight
 */
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
