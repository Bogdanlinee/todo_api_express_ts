import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs/promises';
import async from 'async';

interface DBvalues {
  id: number;
  text: string;
  checked: boolean;
}

interface MemoryDB {
  items: Array<DBvalues>;
}

const jsonDBName: string = path.join(path.resolve(), 'db/db.json');

const queue = async.queue(async (task, completed) => {
  const remaining = queue.length();
  const fileDB: string = await fs.readFile(jsonDBName, 'utf-8');
  const fileData: MemoryDB = JSON.parse(fileDB);

  const id: number = 1 + fileData.items.reduce((acc: number, item: DBvalues): number => {
    if (item.id > acc) {
      acc = item.id;
    }
    return acc;
  }, 0);

  fileData.items.push({ text: 'text', id, checked: false });
  fs.writeFile(jsonDBName, JSON.stringify(fileData, null, 2));
  completed(null, { task, remaining, id });
}, 1);

const getAllTasks = async (req: Request, res: Response) => {
  try {
    const fileDB: string = await fs.readFile(jsonDBName, 'utf-8');
    res.json(JSON.parse(fileDB));
  } catch (error) {
    res.status(500).json({ error });
  }
}

const createOneTask = async (req: Request, res: Response) => {
  try {
    const { text }: DBvalues = req.body;

    if (!text) {
      return res.status(400).json({ error: 'Provide task title, please' });
    }

    queue.push('task', (error, { task, remaining, id }) => {
      if (error) {
        console.log(`An error occurred while processing task ${task}`);
      } else {
        res.json({ id });
      }
    })


  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}

const updateOneTask = async (req: Request, res: Response) => {
  try {
    const { text, id, checked }: DBvalues = req.body;

    if (!text || !id || checked === undefined) {
      return res.status(400).json({ error: 'Provide required field, please' });
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
      return res.status(400).json({ error: 'Task id does not exist' });
    }

    await fs.writeFile(jsonDBName, JSON.stringify(fileData, null, 2));

    res.json({ 'ok': true });
  } catch (error) {
    res.status(500).json({ error });
  }
}

const deleteOneTask = async (req: Request, res: Response) => {
  try {
    const { id }: DBvalues = req.body;

    if (!id) {
      return res.status(400).json({ error: 'Task id does not exist' });
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
    res.status(500).json({ error });
  }
}

export { getAllTasks, createOneTask, updateOneTask, deleteOneTask }