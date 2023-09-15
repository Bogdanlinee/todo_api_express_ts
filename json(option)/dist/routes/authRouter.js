"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authControllers_1 = require("../controllers/authControllers");
// import sessionConfig from '../utils/sessionConfig';
// import session from 'express-session';
const router = express_1.default.Router();
router.post('/logout', session(sessionConfig), authControllers_1.logout);
router.post('/register', session(sessionConfig), authControllers_1.register);
router.post('/login', session(sessionConfig), authControllers_1.login);
exports.default = router;
