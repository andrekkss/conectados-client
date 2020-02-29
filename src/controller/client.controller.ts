import {Body, Controller, Delete, Get, Post} from '@nestjs/common';
import { ClientRepository } from '../repository/client.repository';
import {ClientModel} from "../model/client.model";

@Controller()
export class ClientController {
  constructor(private readonly appService: ClientRepository) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  createClient(@Body() client: ClientModel): string {
    return client.name;
  }

}
