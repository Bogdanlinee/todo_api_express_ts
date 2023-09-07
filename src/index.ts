import express from 'express';
import fs from 'fs/promises';

const app = express();
const port = 5000;

interface DBvalues {
  id: number;
  text: string;
  checked: boolean;
}

interface MemoryDB {
  items: Array<DBvalues>;
}

const memoryDB: MemoryDB = {
  items: [
    {
      id: 22,
      text: "First Task",
      checked: true
    }
  ]
};

app.use(express.static('public'));
app.use(express.json());

app.get('/api/v1/items', async (req, res) => {
  res.json(memoryDB);
});

app.post('/api/v1/items', async (req, res) => {
  const { text }: { text: string } = req.body;
  const checked: boolean = false;

  if (!text) {
    res.json({ sussess: false });
  }

  const id: number = memoryDB.items.reduce((acc, item): number => {
    if (item.id > acc) {
      acc = item.id;
    }
    return acc;
  }, -Infinity);


  memoryDB.items.push({ text, id, checked })

  res.json({ id });
});

app.listen(port, () => {
  console.log('server is running');
});