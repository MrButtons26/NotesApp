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
exports.del = exports.update = exports.read = exports.create = void 0;
const NotesModel_1 = __importDefault(require("../Model/NotesModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const util_1 = require("util");
const UserModel_1 = __importDefault(require("../Model/UserModel"));
const SignalingManager_1 = __importDefault(require("../utils/SignalingManager"));
const manager = SignalingManager_1.default.getInstance();
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { content } = req.body;
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        const { id } = yield (0, util_1.promisify)(jsonwebtoken_1.default.verify)(token, process.env.JWT_SECRET);
        const note = yield NotesModel_1.default.create({ content: content, user: id });
        manager.addNotes(note);
        const user = yield UserModel_1.default.findById(id);
        const updatedNotes = yield UserModel_1.default.findByIdAndUpdate(id, { notes: [...user.notes, note.id] });
        res.send('done');
    }
    catch (e) {
        res.status(400).json({
            status: `failed`,
            data: {
                error: e,
            },
        });
    }
});
exports.create = create;
const read = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        const { id } = yield (0, util_1.promisify)(jsonwebtoken_1.default.verify)(token, process.env.JWT_SECRET);
        const user = yield UserModel_1.default.findById(id).populate({ path: 'notes', select: '-__v' });
        res.json({
            status: 'success',
            data: {
                notes: [...user.notes]
            }
        });
    }
    catch (e) {
        res.status(400).json({
            status: `failed`,
            data: {
                error: e,
            },
        });
    }
});
exports.read = read;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { id, content } = req.body;
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        manager.modifyNotes(id, content);
        const { Userid } = yield (0, util_1.promisify)(jsonwebtoken_1.default.verify)(token, process.env.JWT_SECRET);
        const note = yield NotesModel_1.default.findByIdAndUpdate(id, { content: content });
        res.json({
            status: 'successfully updated',
        });
    }
    catch (e) {
        res.status(400).json({
            status: `failed`,
            data: {
                error: e,
            },
        });
    }
});
exports.update = update;
const del = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { id: noteId } = req.body;
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        const { id } = yield (0, util_1.promisify)(jsonwebtoken_1.default.verify)(token, process.env.JWT_SECRET);
        const user = yield UserModel_1.default.findById(id);
        const notes = user.notes.filter((el) => el != noteId);
        yield UserModel_1.default.findByIdAndUpdate(id, { notes: notes });
        manager.delNotes(noteId);
        const note = yield NotesModel_1.default.findByIdAndDelete(noteId);
        res.json({
            status: 'successfully deleted',
        });
    }
    catch (e) {
        res.status(400).json({
            status: `failed`,
            data: {
                error: e,
            },
        });
    }
});
exports.del = del;
