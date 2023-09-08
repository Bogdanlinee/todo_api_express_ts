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
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const port = 5000;
const jsonDBName = path_1.default.join(path_1.default.resolve(), 'db/jsonDB/db.json');
app.use(express_1.default.static('public'));
app.use(express_1.default.json());
// get all items
app.get('/api/v1/items', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fileDB = yield promises_1.default.readFile(jsonDBName, 'utf-8');
        res.json(JSON.parse(fileDB));
    }
    catch (error) {
        res.status(500).json({ 'ok': false });
    }
}));
// create one item
app.post('/api/v1/items', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { text } = req.body;
        if (!text) {
            return res.status(500).json({ 'ok': false });
        }
        const fileDB = yield promises_1.default.readFile(jsonDBName, 'utf-8');
        const fileData = JSON.parse(fileDB);
        const id = 1 + fileData.items.reduce((acc, item) => {
            if (item.id > acc) {
                acc = item.id;
            }
            return acc;
        }, 0);
        fileData.items.push({ text, id, checked: false });
        yield promises_1.default.writeFile(jsonDBName, JSON.stringify(fileData, null, 2));
        res.json({ id });
    }
    catch (error) {
        res.status(500).json({ 'ok': false });
    }
}));
// update one item
app.put('/api/v1/items', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { text, id, checked } = req.body;
        if (!text || !id || checked === undefined) {
            return res.status(500).json({ 'ok': false });
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
            return res.status(500).json({ 'ok': false });
        }
        yield promises_1.default.writeFile(jsonDBName, JSON.stringify(fileData, null, 2));
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
        if (!id) {
            return res.status(500).json({ 'ok': false });
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
        res.status(500).json({ 'ok': false });
    }
}));
app.listen(port, () => {
    console.log('server is running');
});
