import { Db, MongoClient } from 'mongodb';

const url = 'mongodb+srv://danBerezin:danBerezin123!@cluster0.yt4biys.mongodb.net/test?retryWrites=true&w=majority"';
const dafaultDbName = 'test';

const client = new MongoClient(url);

export let db: Db;

export const connect = async (dbName: string = dafaultDbName) => {
  const conn = await client.connect();
  db = conn.db(dbName);
  return client;
}