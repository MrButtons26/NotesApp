"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const notesSchema = new mongoose_1.default.Schema({
    createdAt: { type: Date, default: Date.now() },
    content: { type: String, required: [true, `username is compulsory`], trim: [true] },
    user: {
        type: mongoose_1.default.Schema.ObjectId,
        ref: 'User'
    }
});
//pre save middleware for user model
const Notes = mongoose_1.default.model(`Note`, notesSchema);
exports.default = Notes;
