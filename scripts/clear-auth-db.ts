import { closeDbConnection, connectToDb } from '@/server/db/db';

async function clearAuthCollections() {
  try {
    const db = await connectToDb();

    await db.collection('users').drop();
    await db.collection('accounts').drop();
    await db.collection('sessions').drop();

    console.log('Successfully cleared auth collections');
  } catch (error) {
    console.error('Error clearing collections:', error);
  } finally {
    await closeDbConnection();
  }
}

clearAuthCollections();
