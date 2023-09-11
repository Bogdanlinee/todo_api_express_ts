import express from 'express';
import dotenv from 'dotenv'
import mongoose from 'mongoose';

dotenv.config();

const app = express();
const port = 5000;

// app routes
import tasksRouter from './routes/tasksRoutes';

app.use(express.static('public'));
app.use(express.json());

// tasks router
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