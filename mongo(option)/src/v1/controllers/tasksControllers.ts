import { Task, TaskInterface } from '../../models/Tasks';
import { Request, Response } from 'express'

const getAllTasks = async (req: Request, res: Response) => {
  try {
    const items: TaskInterface[] = await Task.find();

    res.json({ items });
  } catch (error) {
    res.status(500).json({ error });
  }
}
const createOneTask = async (req: Request, res: Response) => {
  try {
    const { text }: TaskInterface = req.body;
    const item: TaskInterface = await Task.create({ text });

    if (!text) {

    }

    res.json({ id: item.id });
  } catch (error) {
    res.status(500).json({ error });
  }
}

const updateOneTask = async (req: Request, res: Response) => {
  try {
    const { text, id, checked }: TaskInterface = req.body;
    const result: TaskInterface | null = await Task.findOneAndUpdate(
      { id },
      { text, checked },
      {
        returnDocument: 'after',
        runValidators: true
      }
    );

    if (!result) {
      return res.status(400).json({ error: 'No task found.' });
    }

    res.json({ 'ok': true });
  } catch (error) {
    res.status(500).json({ error });
  }
}

const deleteOneTask = async (req: Request, res: Response) => {
  try {
    const { id }: TaskInterface = req.body;
    const result: TaskInterface | null = await Task.findOneAndDelete({ id });

    if (!result) {
      return res.status(400).json({ error: 'No task found.' });
    }

    res.json({ 'ok': true });
  } catch (error) {
    res.status(500).json({ error });
  }
}

export { getAllTasks, createOneTask, updateOneTask, deleteOneTask }