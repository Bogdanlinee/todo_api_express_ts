import express from 'express';
import dotenv from 'dotenv'
import morgan from 'morgan';
import { connect,db } from './db/db';

dotenv.config();

const app = express();
const port = 5000;

// app routes
import tasksRouter from './routes/tasksRoutes';
import authRouter from './routes/authRoutes';

app.use(morgan('tiny'));
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded());

// tasks router
app.use('/api/v1', authRouter);
app.use('/api/v1/items', tasksRouter);
app.all('*', async (req, res) => {
  res.status(404).send('Can not find the page.');
});

(async function () {
  try {
    if (process.env.MYSQL_CONNECTION) {
      connect(process.env.MYSQL_CONNECTION);
      app.listen(port, () => console.log('server is running'));
    } else {
      throw Error('No connection to database');
    }
  } catch (error) {
    console.log(error);
  }
})()