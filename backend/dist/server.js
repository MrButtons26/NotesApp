"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
require('dotenv').config({ path: './.env' });
const app = (0, express_1.default)();
mongoose_1.default.connect(`mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@cluster0.qs1tf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`).then(() => {
    console.log(`DB Connection Successfull`);
});
app.listen(process.env.PORT, () => {
    console.log('Listening at Port 3000');
});
exports.default = app;
