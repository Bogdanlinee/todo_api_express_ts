import express from 'express';

const app = express();
const port = 5000;

import tasksRouter from './routes/tasksRouter';
import authRouter from './routes/authRouter';

app.use(express.static('public'));
app.use(express.json());
app.use('/api/v1/', authRouter);
app.use('/api/v1/items', tasksRouter);

app.listen(port, () => {
  console.log('server is running');
});