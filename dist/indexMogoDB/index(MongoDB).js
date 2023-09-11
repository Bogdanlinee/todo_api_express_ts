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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const Tasks_1 = require("./models/Tasks");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 5000;
app.use(express_1.default.static('public'));
app.use(express_1.default.json());
// get all items
app.get('/api/v1/items', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const items = yield Tasks_1.Task.find();
        res.json({ items });
    }
    catch (error) {
        res.status(500).json({ 'ok': false });
    }
}));
// create one item
app.post('/api/v1/items', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { text } = req.body;
        const item = yield Tasks_1.Task.create({ text });
        res.json({ id: item.id });
    }
    catch (error) {
        res.status(500).json({ 'ok': false });
    }
}));
// update one item
app.put('/api/v1/items', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
}));
// delete one item
app.delete('/api/v1/items', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
}));
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (process.env.MONGO_URI) {
                yield mongoose_1.default.connect(process.env.MONGO_URI);
                app.listen(port, () => console.log('server is running'));
            }
        }
        catch (error) {
            console.log(error);
        }
    });
})();
