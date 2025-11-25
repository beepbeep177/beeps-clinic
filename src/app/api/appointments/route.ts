import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import clientPromise from '@/lib/mongodb';

//GET all appointments
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const qrId = searchParams.get('qrId');
    const date = searchParams.get('date');

    const client = await clientPromise;
    const db = client.db('qr-clinic');

    //build filter object
    const filter: Record<string, unknown> = {};
    if (qrId) filter.qrId = qrId;
    if (date) filter.date = date;

    const appointments = await db.collection('appointments')
      .find(filter)
      .sort({ date: 1 })
      .limit(200)
      .toArray();
    return NextResponse.json(appointments);
  } catch (_error) {
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}


//POST new appointment
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const client = await clientPromise;
    const db = client.db('qr-clinic');

    const result = await db.collection('appointments').insertOne(body);
    return NextResponse.json({ success: true, id: result.insertedId });
  } catch (_error) {
    return NextResponse.json({ error: 'Failed to create' }, { status: 500 });
  }
}
