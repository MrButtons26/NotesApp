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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const validator_1 = __importDefault(require("validator"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const userSchema = new mongoose_1.default.Schema({
    userName: {
        type: String,
        required: [true, `username is compulsory`],
        trim: [true],
        maxlength: [20, `username must have less than or equal to 20 characters`],
        minlength: [5, `username must have less than or equal to 20 characters`],
        validate: [validator_1.default.isAlphanumeric, `Please enter a valid username`],
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: [true, `This email is already Registered`],
        lowercase: true,
        validate: [validator_1.default.isEmail, `Please enter a valid Email`],
    },
    createdAt: { type: Date, default: Date.now() },
    password: {
        type: String,
        required: [true, `password is compulsory`],
        minlength: 8,
        Select: false,
    },
    notes: [{
            type: mongoose_1.default.Schema.ObjectId,
            ref: 'Note'
        }]
});
userSchema.methods.correctPassword = function (candidatePassword, userPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(candidatePassword, userPassword);
    });
};
//pre save middleware for user model
userSchema.pre(`save`, function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        this.password = yield bcrypt_1.default.hash(this.password, 12);
        next();
    });
});
//making a model out of the user schema
const User = mongoose_1.default.model(`User`, userSchema);
exports.default = User;
