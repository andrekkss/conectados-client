"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HttpRequestError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
        this.message = message;
        this.getMesage = () => this.message;
        this.getStatus = () => this.status;
        // Set the prototype explicitly.
        Object.setPrototypeOf(this, HttpRequestError.prototype);
    }
}
exports.default = HttpRequestError;
