import * as express from 'express';
import { interfaces, controller, httpGet, request, response } from "inversify-express-utils";
import {ClientRepositoryImpl} from "../repository/ClientRepositoryImpl";
import {inject} from "inversify";
import TYPES from "../config/type";

@controller("/client")
export class ClientController implements interfaces.Controller {
    private clientRepository: ClientRepositoryImpl;

    constructor(@inject(TYPES.ClientRepositoryImpl) clientRepository: ClientRepositoryImpl) {
        this.clientRepository = clientRepository;
    }

    @httpGet("/")
    public async index (@request() _req: express.Request, @response() res: express.Response) {
        try {
            //const posts = await this.postRepository.findAll();
            res.send(this.clientRepository.getName())
        } catch(error) {
            res.send('error')
        }
    }
}