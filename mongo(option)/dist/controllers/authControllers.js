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
exports.login = exports.register = exports.logout = void 0;
const express_session_1 = __importDefault(require("express-session"));
const session_file_store_1 = __importDefault(require("session-file-store"));
const FileStore = (0, session_file_store_1.default)(express_session_1.default);
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, express_session_1.default)({
            store: new FileStore({}),
            secret: 'keyboard cat',
            resave: true,
            saveUninitialized: true,
        });
        res.json({ ok: true });
    }
    catch (error) {
        res.json({ ok: false });
    }
});
exports.login = login;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, express_session_1.default)({
            store: new FileStore({}),
            secret: 'keyboard cat',
            resave: true,
            saveUninitialized: true,
        });
        res.json({ ok: true });
    }
    catch (error) {
        res.json({ ok: false });
    }
});
exports.register = register;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        req.session.destroy();
        res.clearCookie('connect.sid');
        res.json({ ok: true });
    }
    catch (error) {
        res.json({ ok: false });
    }
});
exports.logout = logout;
