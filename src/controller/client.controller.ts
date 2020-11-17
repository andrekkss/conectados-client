import * as express from 'express';
import { interfaces, controller, httpGet, request, response, httpPost } from "inversify-express-utils";
import { ClientRepositoryImpl } from "../repository/ClientRepositoryImpl";
import { inject } from "inversify";
import TYPES from "../config/type";

@controller("/client")
export class ClientController implements interfaces.Controller {
    private clientRepository: ClientRepositoryImpl;

    constructor(@inject(TYPES.ClientRepositoryImpl) clientRepository: ClientRepositoryImpl) {
        this.clientRepository = clientRepository;
    }

    @httpGet("/")
    public async get(@request() _req: express.Request, @response() res: express.Response) {
        try {
            const clients = await this.clientRepository.getAllUser();
            res.status(200).send(clients)
        } catch(error) {
            res.send(error)
        }
    }

    @httpPost("/")
    public async post(@request() req: express.Request, @response() res: express.Response) {
        try {
            const userModel = {
                email: req.body.email,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                userName: req.body.userName,
                password: req.body.password
             }
            const user = await this.clientRepository.createUser(userModel);
            res.send(user)
        } catch(error) {
            res.send(error)
        }
    }

    @httpPost("/auth")
    public async authentication(@request() req: express.Request, @response() res: express.Response) {
        try {
            const userName = req.body.userName;
            const password = req.body.password;
            const auth = await this.clientRepository.authentication(userName, password);
            res.send(auth)
        } catch(error) {
            res.send(error)
        }
    }
}