import express from 'express';
import fs from 'fs/promises';
import path from 'path';

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

const jsonDBName: string = path.join(path.resolve(), 'db/jsonDB/db.json');

app.use(express.static('public'));
app.use(express.json());

// get all items
app.get('/api/v1/items', async (req, res) => {
  try {
    const fileDB: string = await fs.readFile(jsonDBName, 'utf-8');
    res.json(JSON.parse(fileDB));
  } catch (error) {
    res.status(500).json({ 'ok': false });
  }
});

// create one item
app.post('/api/v1/items', async (req, res) => {
  try {
    const { text }: DBvalues = req.body;

    if (!text) {
      return res.status(500).json({ 'ok': false });
    }

    const fileDB: string = await fs.readFile(jsonDBName, 'utf-8');
    const fileData: MemoryDB = JSON.parse(fileDB);

    const id: number = 1 + fileData.items.reduce((acc: number, item: DBvalues): number => {
      if (item.id > acc) {
        acc = item.id;
      }
      return acc;
    }, 0);

    fileData.items.push({ text, id, checked: false });
    await fs.writeFile(jsonDBName, JSON.stringify(fileData, null, 2));

    res.json({ id });
  } catch (error) {
    res.status(500).json({ 'ok': false });
  }
});

// update one item
app.put('/api/v1/items', async (req, res) => {
  try {
    const { text, id, checked }: DBvalues = req.body;

    if (!text || !id || checked === undefined) {
      return res.status(500).json({ 'ok': false });
    }

    const fileDB: string = await fs.readFile(jsonDBName, 'utf-8');
    const fileData: MemoryDB = JSON.parse(fileDB);
    const doesIdExist: DBvalues | undefined = fileData.items.find((item: DBvalues, index: number) => {
      if (item.id === id) {
        fileData.items[index].text = text;
        fileData.items[index].checked = checked;
        return item.id === id;
      }
    });

    if (!doesIdExist) {
      return res.status(500).json({ 'ok': false });
    }

    await fs.writeFile(jsonDBName, JSON.stringify(fileData, null, 2));

    res.json({ 'ok': true });
  } catch (error) {
    res.status(500).json({ 'ok': false });
  }
});

// delete one item
app.delete('/api/v1/items', async (req, res) => {
  try {
    const { id }: DBvalues = req.body;

    if (!id) {
      return res.status(500).json({ 'ok': false });
    }

    const fileDB: string = await fs.readFile(jsonDBName, 'utf-8');
    const fileData: MemoryDB = JSON.parse(fileDB);
    const doesIdExist: DBvalues | undefined = fileData.items.find((item: DBvalues, index: number) => {
      if (item.id === id) {
        fileData.items.splice(index, 1);
        return item.id === id;
      }
    });

    if (doesIdExist) {
      await fs.writeFile(jsonDBName, JSON.stringify(fileData, null, 2));
    }

    res.json({ 'ok': true });
  } catch (error) {
    res.status(500).json({ 'ok': false });
  }
});

app.listen(port, () => {
  console.log('server is running');
});