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
const memoryDB = {
    items: [
        {
            id: 22,
            text: "First Task",
            checked: true
        }
    ]
};
const getAllTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json(memoryDB);
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
exports.getAllTasks = getAllTasks;
const createOneTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { text } = req.body;
        if (!text) {
            return res.status(500).json({ 'ok': false });
        }
        const id = 1 + memoryDB.items.reduce((acc, item) => {
            if (item.id > acc) {
                acc = item.id;
            }
            return acc;
        }, 0);
        memoryDB.items.push({ text, id, checked: false });
        res.json({ id });
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
exports.createOneTask = createOneTask;
const updateOneTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { text, id, checked } = req.body;
        if (!text || !id || checked === undefined) {
            return res.status(400).json({ 'ok': false });
        }
        const doesIdExist = memoryDB.items.find((item, index) => {
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
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
exports.updateOneTask = updateOneTask;
const deleteOneTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({ 'ok': false });
        }
        const doesIdExist = memoryDB.items.find((item, index) => {
            if (item.id === id) {
                memoryDB.items.splice(index, 1);
                return item.id === id;
            }
        });
        res.json({ 'ok': true });
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
exports.deleteOneTask = deleteOneTask;
