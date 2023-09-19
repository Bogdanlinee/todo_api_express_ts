"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOneTask = exports.updateOneTask = exports.createOneTask = exports.getAllTasks = void 0;
const db_1 = require("../../db/db");
const getAllTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const items = yield db_1.db.collection('tasks').find({}).toArray();
        res.json({ items });
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
exports.getAllTasks = getAllTasks;
const createOneTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { text, checked } = req.body;
        if (!text.trim()) {
            return res.status(400).json({ error: 'Can not create new task.' });
        }
        if (!checked) {
            checked = false;
        }
        else {
            checked = true;
        }
        const item = yield db_1.db.collection('tasks').insertOne({ text, checked });
        res.json({ id: item.insertedId.toString() });
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
exports.createOneTask = createOneTask;
const updateOneTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // try {
    //   const { text, id, checked }: TaskInterface = req.body;
    //   const result: TaskInterface | null = await Task.findOneAndUpdate(
    //     { id },
    //     { text, checked },
    //     {
    //       returnDocument: 'after',
    //       runValidators: true
    //     }
    //   );
    //   if (!result) {
    //     return res.status(400).json({ error: 'No task found.' });
    //   }
    //   res.json({ 'ok': true });
    // } catch (error) {
    //   res.status(500).json({ error });
    // }
});
exports.updateOneTask = updateOneTask;
const deleteOneTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // try {
    //   const { id }: TaskInterface = req.body;
    //   const result: TaskInterface | null = await Task.findOneAndDelete({ id });
    //   if (!result) {
    //     return res.status(400).json({ error: 'No task found.' });
    //   }
    //   res.json({ 'ok': true });
    // } catch (error) {
    //   res.status(500).json({ error });
    // }
});
exports.deleteOneTask = deleteOneTask;
