//Delete API route

import { ObjectId } from 'mongodb';
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid appointment ID' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('qr-clinic');

    const result = await db.collection('appointments').deleteOne({
      _id: new ObjectId(id)
    });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Appointment not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete appointment error:', error);
    return NextResponse.json({ error: 'Failed to delete appointment' }, { status: 500 });
  }
}