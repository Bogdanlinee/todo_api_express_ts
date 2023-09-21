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
const mysql_1 = __importDefault(require("mysql"));
// import { connect } from './db/db';
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 5000;
var connection = mysql_1.default.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'test',
});
connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err);
        return;
    }
    console.log('connected as id ' + connection.threadId);
});
connection.query('SELECT * FROM `tasks`', (err, result, field) => {
    console.log(err);
    console.log(result);
    // console.log(result[1]['lastname']);
    // console.log(field);
});
// // app routes
// import tasksRouterV1 from './v1/routes/tasksRoutes';
// import authRouterV1 from './v1/routes/authRoutes';
// import tasksRouterV2 from './v2/routes/router';
// app.use(morgan('tiny'));
// app.use(express.static('public'));
// app.use(express.json());
// app.use(express.urlencoded());
// // tasks router
// app.use('/api/v1', authRouterV1);
// app.use('/api/v1/items', tasksRouterV1);
// app.use('/api/v2/router', tasksRouterV2);
// app.all('*', async (req, res) => {
//   res.status(404).send('Can not find the page.');
// });
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (process.env.MONGO_URI) {
                // await connect(process.env.MONGO_URI);
                app.listen(port, () => console.log('server is running'));
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
