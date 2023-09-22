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
const db_1 = require("../db/db");
const getAllTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const getData = () => __awaiter(void 0, void 0, void 0, function* () {
        yield db_1.db.query('SELECT * FROM tasks', (err, result, field) => {
            // JSON.parse(JSON.stringify(result));
        });
        return 'lol';
    });
    try {
        return res.json({

            items: yield (0, dbQueries_1.selectAllQuery)()
        });
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
exports.getAllTasks = getAllTasks;
const createOneTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { text, checked } = req.body;
        if (!text) {
            return res.status(400).json({ error: 'Can not create new task.' });
        }
        if (!checked) {
            checked = false;
        }
        else {
            checked = true;
        }
        const itemId = yield (0, dbQueries_1.insertOneQuery)(text, checked);
        res.json({ id: itemId });
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
exports.createOneTask = createOneTask;
const updateOneTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { text, id, checked } = req.body;
        if (!text || !id) {
            return res.status(400).json({ error: 'Can not create new task.' });
        }
        if (!checked) {
            checked = false;
        }
        else {
            checked = true;
        }
        yield (0, dbQueries_1.updateOneQuery)(text, id, checked);

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
            return res.status(400).json({ error: 'Can not create new task.' });
        }

        yield (0, dbQueries_1.deleteOneQuery)(id);

        res.json({ 'ok': true });
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
exports.deleteOneTask = deleteOneTask;
