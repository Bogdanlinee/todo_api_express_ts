"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authControllers_1 = require("../controllers/authControllers");
const sessionConfig_1 = __importDefault(require("../utils/sessionConfig"));
const express_session_1 = __importDefault(require("express-session"));
const router = express_1.default.Router();
router.post('/logout', (0, express_session_1.default)(sessionConfig_1.default), authControllers_1.logout);
router.post('/register', (0, express_session_1.default)(sessionConfig_1.default), authControllers_1.register);
router.post('/login', (0, express_session_1.default)(sessionConfig_1.default), authControllers_1.login);
exports.default = router;
