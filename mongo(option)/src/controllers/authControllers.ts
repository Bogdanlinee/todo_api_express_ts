import { Request, Response } from 'express';

const login = async (req: Request, res: Response) => {
  try {
    res.json({ ok: true });
  } catch (error) {
    res.json({ ok: false });
  }
}

const register = async (req: Request, res: Response) => {
  try {
    res.json({ ok: true });
  } catch (error) {
    res.json({ ok: false });
  }
}

const logout = async (req: Request, res: Response) => {
  try {
    req.session.destroy((err: string) => { err });
    res.clearCookie('connect.sid');
    res.json({ ok: true });
  } catch (error) {
    res.json({ ok: false });
  }
}

export { logout, register, login }