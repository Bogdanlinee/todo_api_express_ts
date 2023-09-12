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
const express_session_1 = __importDefault(require("express-session"));
const session_file_store_1 = __importDefault(require("session-file-store"));
const morgan_1 = __importDefault(require("morgan"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 5000;
const FileStore = (0, session_file_store_1.default)(express_session_1.default);
app.use((0, express_session_1.default)({
    store: new FileStore({}),
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
}));
// app routes
const tasksRoutes_1 = __importDefault(require("./routes/tasksRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
app.use((0, morgan_1.default)('tiny'));
app.use(express_1.default.static('public'));
app.use(express_1.default.json());
// tasks router
app.use('/api/v1', authRoutes_1.default);
app.use('/api/v1/items', tasksRoutes_1.default);
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
