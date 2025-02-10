import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const MONGODB_DB = process.env.MONGODB_DB || 'tinygems';

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

if (!MONGODB_DB) {
  throw new Error('Please define the MONGODB_DB environment variable');
}

export const client = new MongoClient(MONGODB_URI);

export async function connectToDb() {
  await client.connect();
  return client.db(MONGODB_DB);
}

export async function closeDbConnection() {
  await client.close();
}
