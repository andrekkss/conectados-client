import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ClientEntity } from '../database/entity/client.entity';
import ClientModel from '../model/client.model';

@Injectable()
export class ClientRepository {
  constructor(@InjectRepository(ClientEntity) private readonly clientRepository: Repository<ClientEntity>) { }

  create(initialValue: Partial<ClientModel> = {}) {
    return this.clientRepository.create(initialValue);
  }

  getAll() {
    return this.clientRepository.find();
  }

  deleteAll() {
    return this.clientRepository.clear()
  }

  async save(userEntity: ClientEntity) {
    return this.clientRepository.save(userEntity);
  }
}