
import mysql, { Connection } from 'mysql';

export let db: Connection;

export const connect = async (credentials: string) => {
  db = mysql.createConnection(JSON.parse(credentials));
  db.connect();

}