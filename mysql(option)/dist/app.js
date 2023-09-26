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
const morgan_1 = __importDefault(require("morgan"));
const db_1 = require("./db/db");
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 5000;
// app routes
const tasksRoutes_1 = __importDefault(require("./routes/tasksRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
app.use((0, cors_1.default)({ origin: 'localhost:8080/' }));
app.use((0, morgan_1.default)('tiny'));
// serving static on another port
// app.use(express.static('public'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded());
// tasks router
app.use('/api/v1', authRoutes_1.default);
app.use('/api/v1/items', tasksRoutes_1.default);
app.all('*', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(404).send('Can not find the page.');
}));
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            app.listen(port, () => console.log('server is running'));
            if (process.env.MYSQL_CONNECTION) {
                (0, db_1.connect)(process.env.MYSQL_CONNECTION);
            }
            else {
                throw Error('No connection to database');
            }
        }
        catch (error) {
            console.log(error);
        }
    });
})();
