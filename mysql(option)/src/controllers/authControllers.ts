import { Request, Response } from 'express';

const login = async (req: Request, res: Response) => {
  console.log('login')
  try {
    const { login, pass }: { login: string, pass: string } = req.body;
    if (!login || !pass) {
      return res.status(400).json({ error: 'Provide credentials, please.' });
    }
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ error });
  }
}

const register = async (req: Request, res: Response) => {
  console.log('logout')
  try {
    const { login, pass }: { login: string, pass: string } = req.body;
    if (!login || !pass) {
      return res.status(400).json({ error: 'Provide credentials, please.' });
    }
    res.json({ ok: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}

const logout = async (req: Request, res: Response) => {
  try {
    req.session.destroy((err: string) => { err });
    res.clearCookie('connect.sid');
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ error });
  }
}

export { logout, register, login }