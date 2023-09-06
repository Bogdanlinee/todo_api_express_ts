import express from 'express';
import fs from 'fs/promises';

const app = express();
const port = 5000;

app.use(express.static('public'));


app.get('/api/v1/items', async (req, res) => {
  const data: string = await fs.readFile('./db(json)/dbJSON.json', 'utf8');
  const result: object = JSON.parse(data);
  // res.set('Content-Type', 'json');
  res.status(200).json(result);
})

app.listen(port, () => {
  console.log('server is running');
})