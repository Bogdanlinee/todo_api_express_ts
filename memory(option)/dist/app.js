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
const app = (0, express_1.default)();
const port = 5000;
const memoryDB = {
    items: [
        {
            id: 22,
            text: "First Task",
            checked: true
        }
    ]
};
app.use(express_1.default.static('public'));
app.use(express_1.default.json());
// get all items
app.get('/api/v1/items', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json(memoryDB);
}));
// create one item
app.post('/api/v1/items', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
}));
// update one item
app.put('/api/v1/items', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { text, id, checked } = req.body;
    if (!text || !id || checked === undefined) {
        return res.status(500).json({ 'ok': false });
    }
    const doesIdExist = memoryDB.items.find((item, index) => {
        if (item.id === id) {
            memoryDB.items[index].text = text;
            memoryDB.items[index].checked = checked;
            return item.id === id;
        }
    });
    if (!doesIdExist) {
        return res.status(500).json({ 'ok': false });
    }
    res.json({ 'ok': true });
}));
// delete one item
app.delete('/api/v1/items', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    if (!id) {
        return res.status(500).json({ 'ok': false });
    }
    const doesIdExist = memoryDB.items.find((item, index) => {
        if (item.id === id) {
            memoryDB.items.splice(index, 1);
            return item.id === id;
        }
    });
    res.json({ 'ok': true });
}));
app.listen(port, () => {
    console.log('server is running');
});
