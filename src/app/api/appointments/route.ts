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
      .sort({ date: 1, time: 1 })
      .limit(200)
      .toArray();
    return NextResponse.json(appointments);
  } catch (error) {
    console.error('Fetch appointments error:', error);
    return NextResponse.json({ error: 'Failed to fetch appointments' }, { status: 500 });
  }
}


//POST new appointment
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { qrId, name, phone, date, time } = body;

    // Validation
    if (!qrId || !name || !date || !time) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('qr-clinic');

    // Check if slot is already booked
    const existing = await db.collection('appointments').findOne({ qrId, date, time });
    if (existing) {
      return NextResponse.json({ error: 'Time slot already booked' }, { status: 409 });
    }

    // Add timestamps
    const appointment = {
      ...body,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await db.collection('appointments').insertOne(appointment);
    return NextResponse.json({ success: true, id: result.insertedId });
  } catch (error) {
    console.error('Appointment creation error:', error);
    return NextResponse.json({ error: 'Failed to create appointment' }, { status: 500 });
  }
}
