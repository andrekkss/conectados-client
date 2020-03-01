import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from '../database/entity/user.entity';
import UserModel from '../model/user.model';

@Injectable()
export class UserRepository {
  constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) { }

  create(user: Partial<UserModel> = {}) {
    return this.userRepository.create(user);
  }

  findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  deleteAll(): Promise<void> {
    return this.userRepository.clear()
  }

  async save(userEntity: UserEntity) {
    return this.userRepository.save(userEntity);
  }
}