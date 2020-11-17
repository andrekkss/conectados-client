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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.ClientRepositoryImpl = void 0;
const inversify_1 = require("inversify");
const client_1 = __importDefault(require("../model/client"));
const bcrypt = __importStar(require("bcryptjs"));
const http_failure_1 = __importDefault(require("../utils/http_failure"));
const jwt = __importStar(require("jsonwebtoken"));
const jwt_1 = __importDefault(require("../config/jwt"));
let ClientRepositoryImpl = class ClientRepositoryImpl {
    getAllUser() {
        return __awaiter(this, void 0, void 0, function* () {
            return client_1.default.find()
                .then((data) => {
                return data;
            })
                .catch((error) => {
                throw new http_failure_1.default(500, error.message);
            })
                .catch((httpError) => {
                throw httpError;
            });
        });
    }
    authentication(userName, password) {
        return __awaiter(this, void 0, void 0, function* () {
            return client_1.default.findOne({ userName: userName })
                .then((data) => {
                if (data != null) {
                    if (!bcrypt.compareSync(password, data.password)) {
                        throw new http_failure_1.default(401, 'usuario ou senha invalidos');
                    }
                    else {
                        const token = jwt.sign({ userId: data._id, username: data.userName }, jwt_1.default.jwtSecret);
                        const clientAuthenticated = Object.assign(Object.assign({}, data.toObject()), { token });
                        return clientAuthenticated;
                    }
                }
                else
                    throw new http_failure_1.default(400, 'usuario não encontrado');
            })
                .catch((error) => {
                throw new http_failure_1.default(500, error.message);
            })
                .catch((httpError) => {
                throw httpError;
            });
        });
    }
    createUser({ email, firstName, lastName, userName, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            return client_1.default.create({
                email,
                firstName,
                lastName,
                userName,
                password: bcrypt.hashSync(password, 8)
            })
                .then((data) => {
                return data;
            })
                .catch((error) => {
                console.log('error: ' + JSON.stringify(error));
                throw new http_failure_1.default(500, error.message);
            })
                .catch((httpError) => {
                throw httpError;
            });
        });
    }
};
ClientRepositoryImpl = __decorate([
    inversify_1.injectable()
], ClientRepositoryImpl);
exports.ClientRepositoryImpl = ClientRepositoryImpl;
