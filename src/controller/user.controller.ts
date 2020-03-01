import {Body, Controller, Get, Post} from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import UserModel from "../model/user.model";
import { UserEntity } from '../database/entity/user.entity';

@Controller()
export class UserController {
  constructor(private readonly appService: UserRepository) {}

  @Get()
  getAllClient(): Promise<UserEntity[]> {
    return this.appService.findAll();
  }

  @Post()
  createClient(@Body() client: UserModel): string {
    return client.name;
  }
}
