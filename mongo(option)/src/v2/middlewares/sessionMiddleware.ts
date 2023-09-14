import { Request, Response, NextFunction } from "express";
import sessionConfig from '../utils/sessionConfig';
import session from 'express-session';

const sessionMiddleware = (req: Request, res: Response, next: NextFunction) => {
  let { action } = req.query

  switch (action) {
    case 'logout':
      session(sessionConfig)(req, res, next);
      return;
    case 'login':
      session(sessionConfig)(req, res, next);
      return;
    case 'register':
      session(sessionConfig)(req, res, next);
      return;
  }
  next();
}

export default sessionMiddleware;