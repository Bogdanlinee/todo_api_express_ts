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
exports.deleteOneQuery = exports.updateOneQuery = exports.insertOneQuery = exports.selectAllQuery = void 0;
const db_1 = require("./db");
const selectAllQuery = () => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM tasks';
        db_1.db.query(query, (err, result) => {
            if (err) {
                throw new Error('Something wrong with database');
            }
            let data = JSON.parse(JSON.stringify(result));
            data = data.map((item) => {
                item.checked ? item.checked = true : item.checked = false;
                return item;
            });
            resolve(data);
        });
    });
});
exports.selectAllQuery = selectAllQuery;
const insertOneQuery = (text, checked) => __awaiter(void 0, void 0, void 0, function* () {
    const checkedValue = checked ? 1 : 0;
    return new Promise((resolve, reject) => {
        const query = "INSERT INTO `tasksDatabse`.`tasks` (`text`,`checked`) VALUES ('" + text + "','" + checkedValue + "');";
        db_1.db.query(query, (err, result) => {
            if (err) {
                throw new Error('Something wrong with database');
            }
            resolve(result.insertId);
        });
    });
});
exports.insertOneQuery = insertOneQuery;
const updateOneQuery = (text, id, checked) => __awaiter(void 0, void 0, void 0, function* () {
    const checkedValue = checked ? 1 : 0;
    return new Promise((resolve, reject) => {
        const query = "UPDATE `tasksDatabse`.`tasks` SET text = '" + text + "', checked = '" + checkedValue + "'  WHERE id = '" + id + "'";
        db_1.db.query(query, (err, result) => {
            if (err) {
                throw new Error('Something wrong with database');
            }
            resolve(true);
        });
    });
});
exports.updateOneQuery = updateOneQuery;
const deleteOneQuery = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        const query = "DELETE FROM `tasksDatabse`.`tasks` WHERE id = '" + id + "'";
        db_1.db.query(query, (err, result) => {
            if (err) {
                throw new Error('Something wrong with database');
            }
            resolve(true);
        });
    });
});
exports.deleteOneQuery = deleteOneQuery;
