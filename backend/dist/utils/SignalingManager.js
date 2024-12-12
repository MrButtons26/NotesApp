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
const NotesModel_1 = __importDefault(require("../Model/NotesModel"));
const ws_1 = require("ws");
class SignallingManager {
    constructor() {
        SignallingManager.notes = [];
        this.wss = new ws_1.WebSocket.Server({ port: process.env.WSPORT });
        console.log(`WebSocket server started on port 4000`);
        this.init();
    }
    init() {
        this.wss.on('connection', (ws) => {
            console.log('hello');
            ws.on('message', function message(data) {
                console.log(String(data));
                if (String(data) == 'subscribeToNotes') {
                    console.log(11);
                    if (SignallingManager.wsConnections.has(ws)) {
                        const UserId = SignallingManager.wsConnections.get(ws);
                        let userNotes = SignallingManager.notes.filter((el) => String(el.user) == JSON.parse(UserId));
                        ws.send(JSON.stringify(userNotes));
                    }
                }
                else {
                    SignallingManager.wsConnections.set(ws, String(data));
                    console.log('received: %s', data, SignallingManager.wsConnections);
                }
            });
            ws.on('close', function message(data) {
                SignallingManager.wsConnections.delete(ws);
                console.log(data, SignallingManager.wsConnections);
            });
        });
    }
    static getInstance() {
        if (SignallingManager.instance) {
            return SignallingManager.instance;
        }
        SignallingManager.instance = new SignallingManager();
        return SignallingManager.instance;
    }
    getAllNotes() {
        return __awaiter(this, void 0, void 0, function* () {
            const allNotes = yield NotesModel_1.default.find();
            SignallingManager.notes = [...allNotes];
        });
    }
    addNotes(note) {
        SignallingManager.notes.push(note);
        console.log(SignallingManager.notes);
    }
    delNotes(noteId) {
        const auxillary = SignallingManager.notes.filter((el) => el._id != noteId);
        SignallingManager.notes = [...auxillary];
    }
    modifyNotes(noteId, content) {
        SignallingManager.notes.forEach((el) => { if (el._id == noteId) {
            el.content = content;
        } });
    }
    view() {
    }
}
SignallingManager.wsConnections = new Map();
exports.default = SignallingManager;
