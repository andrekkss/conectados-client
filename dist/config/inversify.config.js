"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var type_1 = __importDefault(require("./type"));
var inversify_1 = require("inversify");
var PostRepositoryImpl_1 = require("../repository/PostRepositoryImpl");
var container = new inversify_1.Container();
container.bind(type_1.default.PostRepositoryImpl).to(PostRepositoryImpl_1.PostRepositoryImpl).inSingletonScope();
exports.default = container;
