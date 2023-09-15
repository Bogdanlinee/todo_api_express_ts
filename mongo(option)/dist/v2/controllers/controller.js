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
const Tasks_1 = require("../../models/Tasks");
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
        const items = yield Tasks_1.Task.find();
        res.json({ items });
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
const createItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { text } = req.body;
        const item = yield Tasks_1.Task.create({ text });
        if (!text) {
        }
        res.json({ id: item.id });
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
const editItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { text, id, checked } = req.body;
        const result = yield Tasks_1.Task.findOneAndUpdate({ id }, { text, checked }, {
            returnDocument: 'after',
            runValidators: true
        });
        if (!result) {
            return res.status(400).json({ error: 'No task found.' });
        }
        res.json({ 'ok': true });
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
const deleteItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        const result = yield Tasks_1.Task.findOneAndDelete({ id });
        if (!result) {
            return res.status(400).json({ error: 'No task found.' });
        }
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
