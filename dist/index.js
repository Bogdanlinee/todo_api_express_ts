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
app.get('/api/v1/items', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json(memoryDB);
}));
app.post('/api/v1/items', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { text } = req.body;
    const checked = false;
    if (!text) {
        res.json({ sussess: false });
    }
    const id = memoryDB.items.reduce((acc, item) => {
        if (item.id > acc) {
            acc = item.id;
        }
        return acc;
    }, -Infinity);
    memoryDB.items.push({ text, id, checked });
    res.json({ id });
}));
app.listen(port, () => {
    console.log('server is running');
});
