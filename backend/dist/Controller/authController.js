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
exports.protect = exports.login = exports.signUp = void 0;
const UserModel_1 = __importDefault(require("../Model/UserModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const util_1 = require("util");
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName, email, password } = req.body;
    try {
        //creating new user
        const query = UserModel_1.default.create({ userName, email, password });
        const newUser = yield query;
        //signing user and sending jwt to the client
        const token = jsonwebtoken_1.default.sign({ id: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: "90d",
        });
        res.status(201).json({
            status: `success`,
            data: {
                _id: newUser._id,
                token,
            },
        });
    }
    catch (e) {
        res.status(401).json({
            status: `failed`,
            data: {
                error: e,
            },
        });
    }
});
exports.signUp = signUp;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(401).json({
            status: `failed`,
            data: {
                error: `Email and password cannot be empty`,
            },
        });
    }
    //finding the user in the DB
    const user = yield UserModel_1.default.findOne({ email }).select(`+password`);
    console.log(user);
    if (!user || !(yield user.correctPassword(password, user.password))) {
        return res.status(401).json({
            status: `failed`,
            data: {
                error: `Incorrect email or password`,
            },
        });
    }
    //verifying the jwt 
    const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "265d",
    });
    res.status(201).json({
        status: `success`,
        data: {
            _id: user._id,
            token,
        }
    });
});
exports.login = login;
const protect = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        //verifying the jwt
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        const id = yield (0, util_1.promisify)(jsonwebtoken_1.default.verify)(token, process.env.JWT_SECRET);
        next();
    }
    catch (e) {
        console.log(e);
        res.status(401).json({
            status: `Please log in `,
        });
    }
});
exports.protect = protect;
