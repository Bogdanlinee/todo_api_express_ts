"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = __importDefault(require("../controllers/controller"));
const sessionMiddleware_1 = __importDefault(require("../middlewares/sessionMiddleware"));
const router = express_1.default.Router();
router.route('/').post(sessionMiddleware_1.default, controller_1.default);
exports.default = router;
