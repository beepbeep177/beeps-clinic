// Run this script once to create database indexes
// Usage: node scripts/setup-indexes.js

const { MongoClient } = require('mongodb');

async function setupIndexes() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('MONGODB_URI not found in environment variables');
    process.exit(1);
  }

  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db('qr-clinic');
    const appointments = db.collection('appointments');

    // Create compound index for faster queries
    await appointments.createIndex({ qrId: 1, date: 1, time: 1 }, { unique: true });
    console.log('✓ Created unique index on qrId + date + time');

    await appointments.createIndex({ date: 1, time: 1 });
    console.log('✓ Created index on date + time');

    await appointments.createIndex({ createdAt: 1 });
    console.log('✓ Created index on createdAt');

    console.log('\nAll indexes created successfully!');
  } catch (error) {
    console.error('Error setting up indexes:', error);
  } finally {
    await client.close();
  }
}

setupIndexes();
