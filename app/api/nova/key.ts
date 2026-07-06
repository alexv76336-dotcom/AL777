import { NextRequest, NextResponse } from 'next/server';

// Simple in-memory storage (for demo)
// In production, use a database
let storedKey = '';

export async function GET(request: NextRequest) {
  return NextResponse.json({ key: storedKey });
}

export async function POST(request: NextRequest) {
  try {
    const { key } = await request.json();

    if (!key) {
      return NextResponse.json({ error: 'Key required' }, { status: 400 });
    }

    if (!key.startsWith('sk-ant-')) {
      return NextResponse.json({ error: 'Invalid key format' }, { status: 400 });
    }

    storedKey = key;

    return NextResponse.json({ success: true, message: 'Key saved' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save key' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  storedKey = '';
  return NextResponse.json({ success: true });
}
