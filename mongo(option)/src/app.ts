import express from 'express';
import dotenv from 'dotenv'
import morgan from 'morgan';
import { connect } from './db/db';
import cors from 'cors';

dotenv.config();

const app = express();
const port = 5000;
const corsSettings = { origin: 'http://localhost:8080', credentials: true }

// app routes
import tasksRouterV1 from './v1/routes/tasksRoutes';
import authRouterV1 from './v1/routes/authRoutes';
import tasksRouterV2 from './v2/routes/router';

app.use(cors(corsSettings));
app.use(morgan('tiny'));
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded());

// tasks router
app.use('/api/v1', authRouterV1);
app.use('/api/v1/items', tasksRouterV1);
app.use('/api/v2/router', tasksRouterV2);
app.all('*', async (req, res) => {
  res.status(404).send('Can not find the page.');
});

(async function () {
  try {
    if (process.env.MONGO_URI) {
      await connect(process.env.MONGO_URI);
      app.listen(port, () => console.log('server is running'));
    } else {
      throw Error('No connection to database');
    }
  } catch (error) {
    console.log(error);
  }
})()