import express from 'express';
import tasksRouter from './routes/tasksRouter';
import authRouter from './routes/authRouter';
import cors from 'cors';

const app = express();
const port = 5000;
const corsSettings = { origin: 'http://localhost:8080', credentials: true }

app.use(cors(corsSettings));
app.use(express.static('public'));
app.use(express.json());

app.use('/api/v1/', authRouter);
app.use('/api/v1/items', tasksRouter);

app.listen(port, () => {
  console.log('server is running');
});