'use server';

import { MongoClient } from 'mongodb';

const url = 'mongodb://localhost:27017';
const dbName = 'tinygems';

const client = new MongoClient(url);

export async function connectToDb() {
  await client.connect();
  console.log('Connected to MongoDB');
  return client.db(dbName);
}
