"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tasksControllers_1 = require("../controllers/tasksControllers");
const router = express_1.default.Router();
router.route('/')
    .get(tasksControllers_1.getAllTasks)
    .post(tasksControllers_1.createOneTask)
    .put(tasksControllers_1.updateOneTask)
    .delete(tasksControllers_1.deleteOneTask);
exports.default = router;
