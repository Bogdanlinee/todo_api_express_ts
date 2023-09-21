import session from 'express-session';
import fileStore from 'session-file-store';
const FileStore = fileStore(session);

export default {
  store: new FileStore({}),
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 1,
  }
};