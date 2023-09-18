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
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = exports.db = void 0;
const mongodb_1 = require("mongodb");
const url = 'mongodb+srv://danBerezin:danBerezin123!@cluster0.yt4biys.mongodb.net/test?retryWrites=true&w=majority"';
const dafaultDbName = 'test';
const client = new mongodb_1.MongoClient(url);
const connect = (dbName = dafaultDbName) => __awaiter(void 0, void 0, void 0, function* () {
    const conn = yield client.connect();
    exports.db = conn.db(dbName);
    return client;
});
exports.connect = connect;
