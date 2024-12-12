"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const noteController_1 = require("../Controller/noteController");
const authController_1 = require("../Controller/authController");
const router = express_1.default.Router();
router.route(`/`).get(noteController_1.read);
router.route(`/`).post(authController_1.protect, noteController_1.create);
router.route(`/`).patch(noteController_1.update);
router.route(`/`).delete(noteController_1.del);
exports.default = router;
