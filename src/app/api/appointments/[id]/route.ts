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
    const client = await clientPromise;
    const db = client.db('qr-clinic');

    await db.collection('appointments').deleteOne({
      _id: new ObjectId(id)
    });

    return NextResponse.json({ success: true });
  } catch (_error) {
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}