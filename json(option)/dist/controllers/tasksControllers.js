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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOneTask = exports.updateOneTask = exports.createOneTask = exports.getAllTasks = void 0;
const path_1 = __importDefault(require("path"));
const promises_1 = __importDefault(require("fs/promises"));
const async_1 = __importDefault(require("async"));
const jsonDBName = path_1.default.join(path_1.default.resolve(), 'db/db.json');
const queue = async_1.default.queue((text, completed) => __awaiter(void 0, void 0, void 0, function* () {
    const fileDB = yield promises_1.default.readFile(jsonDBName, 'utf-8');
    const fileData = JSON.parse(fileDB);
    const id = 1 + fileData.items.reduce((acc, item) => {
        if (item.id > acc) {
            acc = item.id;
        }
        return acc;
    }, 0);
    fileData.items.push({ text, id, checked: false });
    promises_1.default.writeFile(jsonDBName, JSON.stringify(fileData, null, 2));
    completed(null, id);
}), 1);
const getAllTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fileDB = yield promises_1.default.readFile(jsonDBName, 'utf-8');
        res.json(JSON.parse(fileDB));
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
            return res.status(400).json({ error: 'Provide task title, please' });
        }
        queue.push(text, (error, id) => {
            console.log(id);
            if (error) {
                res.status(500).json({ error });
            }
            else {
                res.json({ id });
            }
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
});
exports.createOneTask = createOneTask;
const updateOneTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { text, id, checked } = req.body;
        if (!text || !id || checked === undefined) {
            return res.status(400).json({ error: 'Provide required field, please' });
        }
        const fileDB = yield promises_1.default.readFile(jsonDBName, 'utf-8');
        const fileData = JSON.parse(fileDB);
        const doesIdExist = fileData.items.find((item, index) => {
            if (item.id === id) {
                fileData.items[index].text = text;
                fileData.items[index].checked = checked;
                return item.id === id;
            }
        });
        if (!doesIdExist) {
            return res.status(400).json({ error: 'Task id does not exist' });
        }
        yield promises_1.default.writeFile(jsonDBName, JSON.stringify(fileData, null, 2));
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
            return res.status(400).json({ error: 'Task id does not exist' });
        }
        const fileDB = yield promises_1.default.readFile(jsonDBName, 'utf-8');
        const fileData = JSON.parse(fileDB);
        const doesIdExist = fileData.items.find((item, index) => {
            if (item.id === id) {
                fileData.items.splice(index, 1);
                return item.id === id;
            }
        });
        if (doesIdExist) {
            yield promises_1.default.writeFile(jsonDBName, JSON.stringify(fileData, null, 2));
        }
        res.json({ 'ok': true });
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
exports.deleteOneTask = deleteOneTask;
