import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { UserEntity } from '../database/entity/user.entity';
import DbModule from '../config/db-app-mock.module';

const testUser = {
  name: 'andre',
  cpf: 12345676
};

const wait = time => new Promise(resolve => setTimeout(() => resolve(time), time));

describe('UsersService', () => {
  let service: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        DbModule({
          name: (new Date().getTime() * Math.random()).toString(16), // <-- This is to have a "unique" name for the connection
        }),
        TypeOrmModule.forFeature([
          UserEntity,
        ]),
      ],
      providers: [
        UserRepository,
      ],
    }).compile();

    service = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a new entity', () => {
    const user = service.create(testUser);

    expect(user).toEqual(testUser);
    expect(user instanceof UserEntity).toBe(true);
  });

  it('should save the user and add the createdAt and savedAt fields', async () => {
    const user = service.create(testUser);
    await service.save(user);

    expect(user.createdAt).toBeTruthy();
    expect(user.updatedAt).toBeTruthy();
  });

  it('should update the updatedAt field after an update (with the save method of the service)', async () => {
    const user = service.create(testUser);
    expect(user.updatedAt).not.toBeTruthy();

    await service.save(user);
    expect(user.updatedAt).toBeTruthy();
    expect(user.createdAt.getTime()).toBe(user.updatedAt.getTime());

    const actualUpdate = user.updatedAt;
    user.name = 'kitano';
    expect(user.updatedAt.getTime()).toBe(actualUpdate.getTime());

    await service.save(user);
    await wait(20); // <-- this is just to simulate an update after "some time"
    expect(user.updatedAt.getTime()).toBeGreaterThan(actualUpdate.getTime());
  });

  it('should get all clients after inserts', async () => {
    const clients = await service.findAll();
    expect(clients.length).toBeGreaterThan(1);
  });

  afterAll(async () => {
    console.log('all rows will be deleted');
    await service.deleteAll();
  });
});