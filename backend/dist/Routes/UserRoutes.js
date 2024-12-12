"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../Controller/authController");
const router = express_1.default.Router();
//sign up for user
router.route(`/signup`).post(authController_1.signUp);
//login for user
router.route(`/login`).post(authController_1.login);
exports.default = router;
