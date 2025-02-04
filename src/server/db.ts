import { MongoClient } from 'mongodb';

const url = 'mongodb://localhost:27017';
const dbName = 'tinygems';

export const client = new MongoClient(url);

export async function connectToDb() {
  await client.connect();
  return client.db(dbName);
}

export async function closeDbConnection() {
  await client.close();
}
