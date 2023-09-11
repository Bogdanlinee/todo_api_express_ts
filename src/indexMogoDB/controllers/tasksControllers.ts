import { Task, TaskInterface } from '../models/Tasks';
import { Request, Response } from 'express'

const getAllTasks = async (req: Request, res: Response) => {
  try {
    const items: TaskInterface[] = await Task.find();

    res.json({ items });
  } catch (error) {
    res.status(500).json({ 'ok': false });
  }
}
const createOneTask = async (req: Request, res: Response) => {
  try {
    const { text }: TaskInterface = req.body;
    const item: TaskInterface = await Task.create({ text });

    res.json({ id: item.id });
  } catch (error) {
    res.status(500).json({ 'ok': false });
  }
}

const updateOneTask = async (req: Request, res: Response) => {
  try {
    const { text, id, checked }: TaskInterface = req.body;
    const result: TaskInterface | null = await Task.findOneAndUpdate({ id }, { text, checked }, { returnDocument: 'after' });

    if (!result) {
      return res.json({ 'ok': false });
    }

    res.json({ 'ok': true });
  } catch (error) {
    res.status(500).json({ 'ok': false });
  }
}

const deleteOneTask = async (req: Request, res: Response) => {
  try {
    const { id }: TaskInterface = req.body;
    const result: TaskInterface | null = await Task.findOneAndDelete({ id });

    if (!result) {
      return res.json({ 'ok': false });
    }

    res.json({ 'ok': true });
  } catch (error) {
    res.status(500).json({ 'ok': false });
  }
}

export { getAllTasks, createOneTask, updateOneTask, deleteOneTask }