"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const inversify_config_1 = __importDefault(require("./config/inversify.config"));
const inversify_express_utils_1 = require("inversify-express-utils");
const mongoose_1 = __importDefault(require("mongoose"));
require("./controller/client.controller");
const morgan_1 = __importDefault(require("morgan"));
const bodyParser = __importStar(require("body-parser"));
const server = new inversify_express_utils_1.InversifyExpressServer(inversify_config_1.default, null, { rootPath: "/api/v1" });
//localhost // conectados-mongo
mongoose_1.default.connect('mongodb://conectados-mongo:27017/conectados', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log("service client-service connected to database");
});
server.setErrorConfig((app) => {
    app.use((err, _req, res, _next) => {
        console.error(err.stack + "test");
        res.status(500).send('Something broke!');
    });
});
server.setConfig((app) => {
    const logger = morgan_1.default('combined');
    app.use(logger);
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
});
server.build().listen(3002, '0.0.0.0', () => console.log(`Server on!!`));
