import { TaskInterface } from '../../models/Tasks';
import { Request, Response } from 'express';
import { WithId, InsertOneResult } from 'mongodb'
import { db } from '../../db/db';

const getAllTasks = async (req: Request, res: Response) => {
  try {
    const items: WithId<TaskInterface>[] = await db.collection<TaskInterface>('tasks').find({}).toArray();
    res.json({ items });
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
  // try {
  //   const { text, id, checked }: TaskInterface = req.body;
  //   const result: TaskInterface | null = await Task.findOneAndUpdate(
  //     { id },
  //     { text, checked },
  //     {
  //       returnDocument: 'after',
  //       runValidators: true
  //     }
  //   );

  //   if (!result) {
  //     return res.status(400).json({ error: 'No task found.' });
  //   }

  //   res.json({ 'ok': true });
  // } catch (error) {
  //   res.status(500).json({ error });
  // }
}

const deleteOneTask = async (req: Request, res: Response) => {
  // try {
  //   const { id }: TaskInterface = req.body;
  //   const result: TaskInterface | null = await Task.findOneAndDelete({ id });

  //   if (!result) {
  //     return res.status(400).json({ error: 'No task found.' });
  //   }

  //   res.json({ 'ok': true });
  // } catch (error) {
  //   res.status(500).json({ error });
  // }
}

export { getAllTasks, createOneTask, updateOneTask, deleteOneTask }