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
const express_1 = __importDefault(require("express"));
const server_1 = __importDefault(require("./server"));
const cors_1 = __importDefault(require("cors"));
const UserRoutes_1 = __importDefault(require("./Routes/UserRoutes"));
const NoteRoutes_1 = __importDefault(require("./Routes/NoteRoutes"));
const SignalingManager_1 = __importDefault(require("./utils/SignalingManager"));
server_1.default.use((0, cors_1.default)());
server_1.default.use(express_1.default.json());
const manager = SignalingManager_1.default.getInstance();
function wrapper() {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield manager.getAllNotes();
    });
}
wrapper();
server_1.default.get('/', (req, res) => {
    res.send('Test Path');
});
server_1.default.use(`/user`, UserRoutes_1.default);
server_1.default.use(`/note`, NoteRoutes_1.default);
server_1.default.all('*', (req, res) => {
    res.status(404).json({ status: 'Fail', message: 'This route could not be Found' });
});
