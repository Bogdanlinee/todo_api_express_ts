import { MongoClient, Db } from 'mongodb';

export let db: Db;

export const connect = async (url: string) => {
  const client = new MongoClient(url);
  await client.connect();
  db = client.db('test');
} 