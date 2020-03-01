import {Body, Controller, Get, Post} from '@nestjs/common';
import { ClientRepository } from '../repository/client.repository';
import ClientModel from "../model/client.model";

@Controller()
export class ClientController {
  constructor(private readonly appService: ClientRepository) {}

  @Get()
  getAllClient() {
    return this.appService.getAll();
  }

  @Post()
  createClient(@Body() client: ClientModel): string {
    return client.name;
  }
}
