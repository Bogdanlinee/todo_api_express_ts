import { Request, Response } from 'express'

interface DBvalues {
  id: number;
  text: string;
  checked: boolean;
}

interface MemoryDB {
  items: Array<DBvalues>;
}

const memoryDB: MemoryDB = {
  items: [
    {
      id: 22,
      text: "First Task",
      checked: true
    }
  ]
};

const getAllTasks = async (req: Request, res: Response) => {
  try {
    res.json(memoryDB);
  } catch (error) {
    res.status(500).json({ error });
  }
}
const createOneTask = async (req: Request, res: Response) => {
  try {
    const { text }: DBvalues = req.body;

    if (!text) {
      return res.status(500).json({ 'ok': false });
    }

    const id: number = 1 + memoryDB.items.reduce((acc: number, item: DBvalues): number => {
      if (item.id > acc) {
        acc = item.id;
      }
      return acc;
    }, 0);

    memoryDB.items.push({ text, id, checked: false })

    res.json({ id });
  } catch (error) {
    res.status(500).json({ error });
  }
}

const updateOneTask = async (req: Request, res: Response) => {
  try {
    const { text, id, checked }: DBvalues = req.body;

    if (!text || !id || checked === undefined) {
      return res.status(400).json({ 'ok': false });
    }

    const doesIdExist: DBvalues | undefined = memoryDB.items.find((item: DBvalues, index: number) => {
      if (item.id === id) {
        memoryDB.items[index].text = text;
        memoryDB.items[index].checked = checked;
        return item.id === id;
      }
    });


    if (!doesIdExist) {
      return res.status(400).json({ 'ok': false });
    }

    res.json({ 'ok': true });
  } catch (error) {
    res.status(500).json({ error });
  }
}

const deleteOneTask = async (req: Request, res: Response) => {
  try {
    const { id }: DBvalues = req.body;

    if (!id) {
      return res.status(400).json({ 'ok': false });
    }

    const doesIdExist: DBvalues | undefined = memoryDB.items.find((item: DBvalues, index: number) => {
      if (item.id === id) {
        memoryDB.items.splice(index, 1);
        return item.id === id;
      }
    });

    res.json({ 'ok': true });
  } catch (error) {
    res.status(500).json({ error });
  }
}

export { getAllTasks, createOneTask, updateOneTask, deleteOneTask }