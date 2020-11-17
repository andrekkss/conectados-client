"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const type_1 = __importDefault(require("./type"));
const inversify_1 = require("inversify");
const ClientRepositoryImpl_1 = require("../repository/ClientRepositoryImpl");
const container = new inversify_1.Container();
container.bind(type_1.default.ClientRepositoryImpl).to(ClientRepositoryImpl_1.ClientRepositoryImpl).inSingletonScope();
exports.default = container;
