"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tasksRouter_1 = __importDefault(require("./routes/tasksRouter"));
const authRouter_1 = __importDefault(require("./routes/authRouter"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = 5000;
const corsSettings = { origin: 'http://localhost:8080', credentials: true };
app.use((0, cors_1.default)(corsSettings));
app.use(express_1.default.static('public'));
app.use(express_1.default.json());
app.use('/api/v1/', authRouter_1.default);
app.use('/api/v1/items', tasksRouter_1.default);
app.listen(port, () => {
    console.log('server is running');
});
