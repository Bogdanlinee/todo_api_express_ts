import { Request, Response, NextFunction } from 'express';
import { TaskInterface } from '../../models/Tasks';
import { WithId, InsertOneResult, ObjectId } from 'mongodb'
import { db } from '../../db/db';

const controllers = async (req: Request, res: Response, next: NextFunction) => {
  let { action } = req.query

  switch (action) {
    case 'getItems':
      getItems(req, res);
      break;
    case 'editItem':
      editItem(req, res);
      break;
    case 'createItem':
      createItem(req, res);
      break;
    case 'deleteItem':
      deleteItem(req, res);
      break;
    case 'logout':
      logout(req, res);
      break;
    case 'login':
      login(req, res);
      break;
    case 'register':
      register(req, res, next);
      break;
    default:
      sendErrorMessage(req, res);
  }
}

const getItems = async (req: Request, res: Response) => {
  try {
    const items: WithId<TaskInterface>[] = await db.collection<TaskInterface>('tasks').find({}).toArray();
    items.map(item => {
      item.id = item._id.toString();
    })
    res.json({ items });
  } catch (error) {
    res.status(500).json({ error });
  }
}

const createItem = async (req: Request, res: Response) => {
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

const editItem = async (req: Request, res: Response) => {
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

const deleteItem = async (req: Request, res: Response) => {
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

const logout = async (req: Request, res: Response) => {
  try {
    req.session.destroy((err: string) => { err });
    res.clearCookie('connect.sid');
    res.json({ ok: true });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
}

const login = async (req: Request, res: Response) => {
  try {
    const { login, pass }: { login: string, pass: string } = req.body;
    if (!login || !pass) {
      return res.status(400).json({ error: 'Provide credentials, please.' });
    }
    res.json({ ok: true });
  } catch (error) {
    res.json({ error });
  }
}

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { login, pass }: { login: string, pass: string } = req.body;
    if (!login || !pass) {
      return res.status(400).json({ error: 'Provide credentials, please.' });
    }
    res.json({ ok: true });
  } catch (error) {
    res.json({ error });
  }
}

const sendErrorMessage = async (req: Request, res: Response) => {
  res.status(404).send('Can not find the page.');
}

export default controllers;