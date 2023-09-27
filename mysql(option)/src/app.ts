import express from 'express';
import dotenv from 'dotenv'
import morgan from 'morgan';
import { connect } from './db/db';
import cors from 'cors';

dotenv.config();

const app = express();
const port = 5000;

// app routes
import tasksRouter from './routes/tasksRoutes';
import authRouter from './routes/authRoutes';

app.use(cors({ origin: 'localhost:8080/' }))
app.use(morgan('tiny'));
// serving static on another port
// app.use(express.static('public'));
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
    app.listen(port, () => console.log('server is running'));
    if (process.env.MYSQL_CONNECTION) {
      connect(process.env.MYSQL_CONNECTION);
    } else {
      throw Error('No connection to database');
    }
  } catch (error) {
    console.log(error);
  }
})()