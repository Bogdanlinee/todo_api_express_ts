
import { TaskInterface } from '../models/Tasks';
import { Request, Response } from 'express';
import { selectAllQuery, insertOneQuery, updateOneQuery, deleteOneQuery } from '../db/dbQueries';

const getAllTasks = async (req: Request, res: Response) => {
  try {
    return res.json({
      items: await selectAllQuery()
    });
  } catch (error) {
    res.status(500).json({ error });
  }
}

const createOneTask = async (req: Request, res: Response) => {
  try {
    let { text, checked }: TaskInterface = req.body;

    if (!text) {
      return res.status(400).json({ error: 'Can not create new task.' });
    }

    if (!checked) {
      checked = false;
    } else {
      checked = true;
    }

    const itemId = await insertOneQuery(text, checked);

    res.json({ id: itemId });
  } catch (error) {
    res.status(500).json({ error });
  }
}

const updateOneTask = async (req: Request, res: Response) => {
  try {
    let { text, id, checked }: TaskInterface = req.body;

    if (!text || !id) {
      return res.status(400).json({ error: 'Can not create new task.' });
    }

    if (!checked) {
      checked = false;
    } else {
      checked = true;
    }

    await updateOneQuery(text, id, checked);

    res.json({ 'ok': true });
  } catch (error) {
    res.status(500).json({ error });
  }
}

const deleteOneTask = async (req: Request, res: Response) => {
  try {
    const { id }: TaskInterface = req.body;

    if (!id) {
      return res.status(400).json({ error: 'Can not create new task.' });
    }

    await deleteOneQuery(id);
    res.json({ 'ok': true });
  } catch (error) {
    res.status(500).json({ error });
  }
}


export { getAllTasks, createOneTask, updateOneTask, deleteOneTask }