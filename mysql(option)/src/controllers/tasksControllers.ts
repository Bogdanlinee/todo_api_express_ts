import { TaskInterface } from '../../models/Tasks';
import { Request, Response } from 'express';
import { db } from '../db/db';
import { parse } from 'path';

const getAllTasks = async (req: Request, res: Response) => {
  const getData = async () => {
    await db.query('SELECT * FROM tasks', (err, result, field) => {
      // JSON.parse(JSON.stringify(result));
    });
    return 'lol';
  }

  try {
    return res.json({
      items: [
        {
          id: 22,
          text: "First Task",
          checked: true
        }
      ]
    });
    const items: WithId<TaskInterface>[] = await db.collection<TaskInterface>('tasks').find({}).toArray();
    items.map(item => {
      item.id = item._id.toString();
    })
  } catch (error) {
    res.status(500).json({ error });
  }
}
const createOneTask = async (req: Request, res: Response) => {
  try {
    let { text, checked }: TaskInterface = req.body;

    if (!text.trim()) {
      return res.status(400).json({ error: 'Can not create new task.' });
    }

    if (!checked) {
      checked = false;
    } else {
      checked = true;
    }

    const item: InsertOneResult<TaskInterface> = await db.collection<TaskInterface>('tasks').insertOne({ text, checked });

    res.json({ id: item.insertedId.toString() });
  } catch (error) {
    res.status(500).json({ error });
  }
}

const updateOneTask = async (req: Request, res: Response) => {
  try {
    let { text, id, checked }: TaskInterface = req.body;

    if (!text.trim() || !id?.trim()) {
      return res.status(400).json({ error: 'Can not create new task.' });
    }

    if (!checked) {
      checked = false;
    } else {
      checked = true;
    }

    await db.collection('tasks').findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        '$set': {
          text,
          checked
        }
      }
    );

    res.json({ 'ok': true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}

const deleteOneTask = async (req: Request, res: Response) => {
  try {
    const { id }: TaskInterface = req.body;

    if (!id?.trim()) {
      return res.status(400).json({ error: 'Can not create new task.' });
    }

    await db.collection('tasks').findOneAndDelete({ _id: new ObjectId(id) });

    res.json({ 'ok': true });
  } catch (error) {
    res.status(500).json({ error });
  }
}

export { getAllTasks, createOneTask, updateOneTask, deleteOneTask }