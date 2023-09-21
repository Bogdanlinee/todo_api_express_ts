import mysql from 'mysql';

export let db;

export const connect = async (credentials) => {
  db = mysql.createConnection(JSON.parse(credentials));
  db.connect();
}