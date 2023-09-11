"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const taskSchema = new mongoose_1.default.Schema({
    text: {
        type: String,
        required: true
    },
    checked: {
        type: Boolean,
        required: true,
        default: false
    },
    id: {
        type: String,
        immutable: true
    }
});
taskSchema.pre('save', function (next) {
    this.id = this._id;
    next();
});
const Task = mongoose_1.default.model('Task', taskSchema);
exports.Task = Task;
