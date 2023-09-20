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
const mongodb_1 = require("mongodb");
const db_1 = require("../../db/db");
const controllers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let { action } = req.query;
    switch (action) {
        case 'getItems':
            getItems(req, res);
            break;
        case 'editItem':
            editItem(req, res);
            break;
        case 'createItem':
            createItem(req, res);
            break;
        case 'deleteItem':
            deleteItem(req, res);
            break;
        case 'logout':
            logout(req, res);
            break;
        case 'login':
            login(req, res);
            break;
        case 'register':
            register(req, res, next);
            break;
        default:
            sendErrorMessage(req, res);
    }
});
const getItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const items = yield db_1.db.collection('tasks').find({}).toArray();
        items.map(item => {
            item.id = item._id.toString();
        });
        res.json({ items });
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
const createItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
const editItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { text, id, checked } = req.body;
        if (!text.trim() || !(id === null || id === void 0 ? void 0 : id.trim())) {
            return res.status(400).json({ error: 'Can not create new task.' });
        }
        if (!checked) {
            checked = false;
        }
        else {
            checked = true;
        }
        yield db_1.db.collection('tasks').findOneAndUpdate({ _id: new mongodb_1.ObjectId(id) }, {
            '$set': {
                text,
                checked
            }
        });
        res.json({ 'ok': true });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
});
const deleteItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        if (!(id === null || id === void 0 ? void 0 : id.trim())) {
            return res.status(400).json({ error: 'Can not create new task.' });
        }
        yield db_1.db.collection('tasks').findOneAndDelete({ _id: new mongodb_1.ObjectId(id) });
        res.json({ 'ok': true });
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        req.session.destroy((err) => { err; });
        res.clearCookie('connect.sid');
        res.json({ ok: true });
    }
    catch (error) {
        console.log(error);
        res.json({ error });
    }
});
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { login, pass } = req.body;
        if (!login || !pass) {
            return res.status(400).json({ error: 'Provide credentials, please.' });
        }
        res.json({ ok: true });
    }
    catch (error) {
        res.json({ error });
    }
});
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { login, pass } = req.body;
        if (!login || !pass) {
            return res.status(400).json({ error: 'Provide credentials, please.' });
        }
        res.json({ ok: true });
    }
    catch (error) {
        res.json({ error });
    }
});
const sendErrorMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(404).send('Can not find the page.');
});
exports.default = controllers;
