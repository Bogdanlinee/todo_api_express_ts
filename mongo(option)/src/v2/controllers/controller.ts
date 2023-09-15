import { Request, Response, NextFunction } from 'express';
import { Task, TaskInterface } from '../../models/Tasks';

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
    const items: TaskInterface[] = await Task.find();
    res.json({ items });
  } catch (error) {
    res.status(500).json({ error });
  }
}

const createItem = async (req: Request, res: Response) => {
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

const editItem = async (req: Request, res: Response) => {
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

const deleteItem = async (req: Request, res: Response) => {
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