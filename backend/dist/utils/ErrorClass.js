"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MyError extends Error {
    constructor(message) {
        super(message);
        if (message == 'operational') {
            MyError.messageArray.push(message);
        }
        else {
        }
    }
    Instance() {
        MyError.constructor();
    }
}
