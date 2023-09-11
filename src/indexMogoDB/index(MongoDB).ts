import express from 'express';
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import { Task, TaskInterface } from './models/Tasks';

dotenv.config();

const app = express();
const port = 5000;

app.use(express.static('public'));
app.use(express.json());

// get all items
app.get('/api/v1/items', async (req, res) => {
  try {
    const items: TaskInterface[] = await Task.find();

    res.json({ items });
  } catch (error) {
    res.status(500).json({ 'ok': false });
  }
});

// create one item
app.post('/api/v1/items', async (req, res) => {
  try {
    const { text }: TaskInterface = req.body;
    const item: TaskInterface = await Task.create({ text });

    res.json({ id: item.id });
  } catch (error) {
    res.status(500).json({ 'ok': false });
  }
});

// update one item
app.put('/api/v1/items', async (req, res) => {
  try {
    const { text, id, checked }: TaskInterface = req.body;
    const result: TaskInterface | null = await Task.findOneAndUpdate({ id }, { text, checked }, { returnDocument: 'after' });

    if (!result) {
      return res.json({ 'ok': false });
    }

    res.json({ 'ok': true });
  } catch (error) {
    res.status(500).json({ 'ok': false });
  }
});

// delete one item
app.delete('/api/v1/items', async (req, res) => {
  try {
    const { id }: TaskInterface = req.body;
    const result: TaskInterface | null = await Task.findOneAndDelete({ id });

    if (!result) {
      return res.json({ 'ok': false });
    }

    res.json({ 'ok': true });
  } catch (error) {
    res.status(500).json({ 'ok': false });
  }
});

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