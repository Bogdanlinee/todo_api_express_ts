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
const mongodb_1 = require("mongodb");
// import { connect } from './db/db';
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 5000;
// app routes
const tasksRoutes_1 = __importDefault(require("./v1/routes/tasksRoutes"));
const authRoutes_1 = __importDefault(require("./v1/routes/authRoutes"));
const router_1 = __importDefault(require("./v2/routes/router"));
app.use((0, morgan_1.default)('tiny'));
app.use(express_1.default.static('public'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded());
// tasks router
app.use('/api/v1', authRoutes_1.default);
app.use('/api/v1/items', tasksRoutes_1.default);
app.use('/api/v2/router', router_1.default);
app.all('*', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(404).send('Can not find the page.');
}));
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (process.env.MONGO_URI) {
                // await mongoose.connect(process.env.MONGO_URI);
                const url = 'mongodb+srv://danBerezin:danBerezin123!@cluster0.yt4biys.mongodb.net/test?retryWrites=true&w=majority"';
                const dafaultDbName = 'test';
                const client = new mongodb_1.MongoClient(url);
                yield client.connect();
                console.log(yield client.db().collection('test.tasks').find({}));
                app.listen(port, () => console.log('server is running'));
            }
        }
        catch (error) {
            console.log(error);
        }
    });
})();