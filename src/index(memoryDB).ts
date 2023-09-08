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

// get all items
app.get('/api/v1/items', async (req, res) => {
  res.json(memoryDB);
});

// create one item
app.post('/api/v1/items', async (req, res) => {
  const { text }: DBvalues = req.body;

  if (!text) {
    return res.status(500).json({ 'ok': false });
  }

  const id: number = 1 + memoryDB.items.reduce((acc: number, item: DBvalues): number => {
    if (item.id > acc) {
      acc = item.id;
    }
    return acc;
  }, 0);

  memoryDB.items.push({ text, id, checked: false })

  res.json({ id });
});

// update one item
app.put('/api/v1/items', async (req, res) => {
  const { text, id, checked }: DBvalues = req.body;

  if (!text || !id || checked === undefined) {
    return res.status(500).json({ 'ok': false });
  }

  const doesIdExist: DBvalues | undefined = memoryDB.items.find((item: DBvalues, index: number) => {
    if (item.id === id) {
      memoryDB.items[index].text = text;
      memoryDB.items[index].checked = checked;
      return item.id === id;
    }
  });


  if (!doesIdExist) {
    return res.status(500).json({ 'ok': false });
  }

  res.json({ 'ok': true });
});

// delete one item
app.delete('/api/v1/items', async (req, res) => {
  const { id }: DBvalues = req.body;

  if (!id) {
    return res.status(500).json({ 'ok': false });
  }

  const doesIdExist: DBvalues | undefined = memoryDB.items.find((item: DBvalues, index: number) => {
    if (item.id === id) {
      memoryDB.items.splice(index, 1);
      return item.id === id;
    }
  });

  res.json({ 'ok': true });
});

app.listen(port, () => {
  console.log('server is running');
});