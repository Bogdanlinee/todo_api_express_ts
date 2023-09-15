"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sessionConfig_1 = __importDefault(require("../utils/sessionConfig"));
const express_session_1 = __importDefault(require("express-session"));
const sessionMiddleware = (req, res, next) => {
    let { action } = req.query;
    switch (action) {
        case 'logout':
            (0, express_session_1.default)(sessionConfig_1.default)(req, res, next);
            return;
        case 'login':
            (0, express_session_1.default)(sessionConfig_1.default)(req, res, next);
            return;
        case 'register':
            (0, express_session_1.default)(sessionConfig_1.default)(req, res, next);
            return;
    }
    next();
};
exports.default = sessionMiddleware;
