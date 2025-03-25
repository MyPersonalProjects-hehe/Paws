import { MongoClient } from 'mongodb';

const connectionString =
  'mongodb+srv://jechevatanq:evpjfhgqkNbPb5R0@cluster0.cl4dj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const client = new MongoClient(connectionString);
const connection = await client.connect();
const db = connection.db('Paws');
(async () => {
  if (db) {
    console.log('✅ Connected to database:', db.databaseName);
  } else {
    console.log('❌ Failed to connect to database');
  }
})();

export { db };
