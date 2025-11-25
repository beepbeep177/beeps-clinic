import { MongoClient } from "mongodb";

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

const options = {};

const client = new MongoClient(uri, options);
const clientPromise = client.connect();

if (process.env.NODE_ENV !== 'production') {
  global._mongoClientPromise = global._mongoClientPromise ?? clientPromise;
}

export default clientPromise;