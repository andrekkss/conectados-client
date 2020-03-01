import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/config/app.module';

describe('UserController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello');
  });

  it('create a client using model and post method', () => {
    return request(app.getHttpServer())
        .post('/')
        .type('form')
        .send({ name: 'André Kitano da Silva', cpf: 123456 })
        .expect(201)
        .expect('André Kitano da Silva')
  });

  it('should get all users from get method', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)

  });

  afterAll(async () => {
    await app.close();
  });
});
