import { injectable } from "inversify";
import Client, { IClient, IClientAuthenticated } from '../model/client';
import { CreateQuery } from 'mongoose';
import * as bcrypt from "bcryptjs";
import HttpRequestError from '../utils/http_failure';
import * as jwt from "jsonwebtoken";
import config from "../config/jwt";

@injectable()
export class ClientRepositoryImpl {
    async getAllUser(): Promise<IClient[]> {
        return Client.find()
            .then((data: IClient[]) => {
                return data;
            })
            .catch((error: Error) => {
                throw new HttpRequestError(500, error.message);
            })
            .catch((httpError: HttpRequestError) => {
                throw httpError;
            });
    }

    async authentication(userName: string, password: string): Promise<IClientAuthenticated> {
        return Client.findOne({ userName: userName })
        .then((data: IClient | null) => {
            if(data != null){
                if (!bcrypt.compareSync(password, data.password)) {
                    throw new HttpRequestError(401, 'usuario ou senha invalidos');
                } else {
                    const token = jwt.sign({ userId: data._id, username: data.userName }, config.jwtSecret);
                    const clientAuthenticated: IClientAuthenticated = {
                        ...data.toObject(),
                        token
                    }
                    return clientAuthenticated;
                }
            } else throw new HttpRequestError(400, 'usuario não encontrado');
        })
        .catch((error: Error) => {
            throw new HttpRequestError(500, error.message);
        })
        .catch((httpError: HttpRequestError) => {
            throw httpError;
        });
    }

    async createUser({ email, firstName, lastName, userName, password}: CreateQuery<IClient>): Promise<IClient> {
        return Client.create({
            email,
            firstName,
            lastName,
            userName,
            password: bcrypt.hashSync(password, 8)
        })
        .then((data: IClient) => {
            return data;
        })
        .catch((error: Error) => {
            console.log('error: ' + JSON.stringify(error));
            throw new HttpRequestError(500, error.message);
        })
        .catch((httpError: HttpRequestError) => {
            throw httpError;
        });
    }
}