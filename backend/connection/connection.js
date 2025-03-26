import { MongoClient } from 'mongodb';
import { config } from 'dotenv';

config();
const connectionString = process.env.CONNECTION_STRING;
const client = new MongoClient(connectionString);
const connection = await client.connect();
const db = connection.db('Paws');
(async () => {
  if (db) {
    console.log('Connected to database:', db.databaseName);
  } else {
    console.log('Failed to connect to database');
  }
})();

export { db };
