"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var inversify_config_1 = __importDefault(require("./config/inversify.config"));
var inversify_express_utils_1 = require("inversify-express-utils");
require("./controller/post.controller");
var morgan_1 = __importDefault(require("morgan"));
var server = new inversify_express_utils_1.InversifyExpressServer(inversify_config_1.default, null, { rootPath: "/api/v1" });
server.setErrorConfig(function (app) {
    app.use(function (err, _req, res, _next) {
        console.error(err.stack + "test");
        res.status(500).send('Something broke!');
    });
});
server.setConfig(function (app) {
    var logger = morgan_1.default('combined');
    app.use(logger);
});
server.build().listen(3001, '0.0.0.0', function () { return console.log("Server on!!"); });
