import { Request, Response } from 'express';
import session from 'express-session';
import fileStore from 'session-file-store';
const FileStore = fileStore(session);

const login = async (req: Request, res: Response) => {
  try {
    session({
      store: new FileStore({}),
      secret: 'keyboard cat',
      resave: true,
      saveUninitialized: true,
    });
    res.json({ ok: true });
  } catch (error) {
    res.json({ ok: false });
  }
}

const register = async (req: Request, res: Response) => {
  try {
    session({
      store: new FileStore({}),
      secret: 'keyboard cat',
      resave: true,
      saveUninitialized: true,
    });
    res.json({ ok: true });
  } catch (error) {
    res.json({ ok: false });
  }
}

const logout = async (req: Request, res: Response) => {
  try {
    req.session.destroy();
    res.clearCookie('connect.sid');
    res.json({ ok: true });
  } catch (error) {
    res.json({ ok: false });
  }
}

export { logout, register, login }