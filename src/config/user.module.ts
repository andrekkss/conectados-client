import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from '../database/entity/user.entity';
import { UserController } from '../controller/user.controller';
import { UserRepository } from '../repository/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UserRepository],
  controllers: [UserController],
})
export class UserModule {}