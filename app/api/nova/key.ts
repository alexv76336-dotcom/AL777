import { NextRequest, NextResponse } from 'next/server';

// Simple in-memory storage (resets on redeploy, but that's OK)
let storedKey = '';

/**
 * GET /api/nova/key - Retrieve stored API key
 * Returns: { key: "sk-ant-..." }
 */
export async function GET(request: NextRequest) {
  console.log('[Nova API] GET /api/nova/key:', storedKey ? 'key exists' : 'no key');

  return NextResponse.json(
    { key: storedKey },
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    }
  );
}

/**
 * POST /api/nova/key - Save API key
 * Body: { key: "sk-ant-..." }
 * Returns: { success: true }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { key } = body;

    console.log('[Nova API] POST /api/nova/key - attempting to save key');

    if (!key) {
      console.log('[Nova API] Error: No key provided');
      return NextResponse.json(
        { error: 'Key erforderlich', success: false },
        { status: 400 }
      );
    }

    if (!key.startsWith('sk-ant-')) {
      console.log('[Nova API] Error: Invalid key format');
      return NextResponse.json(
        { error: 'Key muss mit sk-ant- beginnen', success: false },
        { status: 400 }
      );
    }

    storedKey = key;
    console.log('[Nova API] Key saved successfully');

    return NextResponse.json(
      { success: true, message: 'Key gespeichert' },
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('[Nova API] Error:', error);
    return NextResponse.json(
      { error: 'Speichern fehlgeschlagen', success: false },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/nova/key - Clear stored API key
 */
export async function DELETE(request: NextRequest) {
  storedKey = '';
  console.log('[Nova API] DELETE /api/nova/key - key cleared');

  return NextResponse.json(
    { success: true },
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    }
  );
}

/**
 * OPTIONS - Handle CORS preflight
 */
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
