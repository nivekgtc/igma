import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { UsersModule } from 'src/users/users.module';

import { faker } from '@faker-js/faker';
import fakerBr from 'faker-br';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  beforeAll(async () => {
    // TODO seed test database
  });

  afterAll(async () => {
    // TODO create test user
    // TODO truncate test database
  });

  it('/ (POST)  Create User', async () => {
    const userSend = {
      name: faker.name.fullName(),
      birthdate: faker.date
        .between('2000-01-01T00:00:00.000Z', '2001-01-01T00:00:00.000Z')
        .toISOString(),
      document: fakerBr.br.cpf(),
    };

    const response = await request(app.getHttpServer())
      .post('/users')
      .send(userSend);

    const { body, statusCode } = response;

    expect(statusCode).toBe(201);
    expect(body).toMatchObject(userSend);
  });

  it('/ (POST)  Throw error if User exists', async () => {
    const userSend = {
      name: faker.name.fullName(),
      birthdate: faker.date.between(
        '2000-01-01T00:00:00.000Z',
        '2001-01-01T00:00:00.000Z',
      ),
      document: fakerBr.br.cpf(),
    };

    const response = await request(app.getHttpServer())
      .post('/users')
      .send(userSend);

    const { body, statusCode } = response;

    expect(statusCode).toBe(201);
    expect(body.id).toBeDefined();
    expect(body).toMatchObject({
      document: userSend.document,
      name: userSend.name,
      birthdate: expect.stringMatching(userSend.birthdate.toISOString()),
    });

    expect(body.birthdate).toBeDefined();

    const responseTwo = await request(app.getHttpServer())
      .post('/users')
      .send(userSend);

    expect(responseTwo.statusCode).toBe(422);
    expect(responseTwo.body.message).toBe('User already exists');
  });

  it('/ (GET) Get Paginated Results', async () => {
    const usersResponse = await request(app.getHttpServer()).get('/users');

    expect(usersResponse.statusCode).toBe(200);

    expect(usersResponse.body.data).toBeDefined();
    expect(usersResponse.body.totalItems).toBeDefined();

    expect(usersResponse.body).toMatchObject({
      page: 1,
      perPage: 10,
    });
  });

  it('/ (GET) Get By Document', async () => {
    const userSend = {
      name: faker.name.fullName(),
      birthdate: faker.date
        .between('2000-01-01T00:00:00.000Z', '2001-01-01T00:00:00.000Z')
        .toISOString(),
      document: fakerBr.br.cpf(),
    };

    const response = await request(app.getHttpServer())
      .post('/users')
      .send(userSend);

    const { body, statusCode } = response;

    expect(statusCode).toBe(201);
    expect(body).toMatchObject(userSend);

    expect(body.birthdate).toBeDefined();

    const usersResponse = await request(app.getHttpServer()).get(
      `/users/${body.document}`,
    );

    expect(usersResponse.statusCode).toBe(200);

    expect(usersResponse.body).toMatchObject(userSend);
  });
});
