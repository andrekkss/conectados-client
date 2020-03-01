import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/config/app.module';
import { UserRepository } from '../src/repository/user.repository';

describe('UserController (e2e)', () => {
  let app: INestApplication;
  let userRepository = {
    findAll: () => ['test']
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(UserRepository)
      .useValue(userRepository)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('create a client using model and post method', async () => {
    return request(app.getHttpServer())
      .post('/')
      .type('form')
      .send({ name: 'André Kitano da Silva', cpf: 123456 })
      .expect(201)
      .expect('André Kitano da Silva');
  });

  it('should get all users from get method', async () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect(userRepository.findAll());
  });

  afterAll(async () => {
    await app.close();
  });
});
