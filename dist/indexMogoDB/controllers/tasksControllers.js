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
const Tasks_1 = require("../models/Tasks");
const getAllTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const items = yield Tasks_1.Task.find();
        res.json({ items });
    }
    catch (error) {
        res.status(500).json({ 'ok': false });
    }
});
exports.getAllTasks = getAllTasks;
const createOneTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { text } = req.body;
        const item = yield Tasks_1.Task.create({ text });
        res.json({ id: item.id });
    }
    catch (error) {
        res.status(500).json({ 'ok': false });
    }
});
exports.createOneTask = createOneTask;
const updateOneTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { text, id, checked } = req.body;
        const result = yield Tasks_1.Task.findOneAndUpdate({ id }, { text, checked }, { returnDocument: 'after' });
        if (!result) {
            return res.json({ 'ok': false });
        }
        res.json({ 'ok': true });
    }
    catch (error) {
        res.status(500).json({ 'ok': false });
    }
});
exports.updateOneTask = updateOneTask;
const deleteOneTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        const result = yield Tasks_1.Task.findOneAndDelete({ id });
        if (!result) {
            return res.json({ 'ok': false });
        }
        res.json({ 'ok': true });
    }
    catch (error) {
        res.status(500).json({ 'ok': false });
    }
});
exports.deleteOneTask = deleteOneTask;
