import express from 'express';
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import session from 'express-session';
import fileStore from 'session-file-store';
import morgan from 'morgan';

dotenv.config();

const app = express();
const port = 5000;

const FileStore = fileStore(session);

app.use(session({
  store: new FileStore({}),
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
}));

// app routes
import tasksRouter from './routes/tasksRoutes';
import authRouter from './routes/authRoutes';

app.use(morgan('tiny'));
app.use(express.static('public'));
app.use(express.json());

// tasks router
app.use('/api/v1', authRouter);
app.use('/api/v1/items', tasksRouter);

(async function () {
  try {
    if (process.env.MONGO_URI) {
      await mongoose.connect(process.env.MONGO_URI);
      app.listen(port, () => console.log('server is running'));
    }
  } catch (error) {
    console.log(error);
  }
})()