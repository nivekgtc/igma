import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/config/database/prisma.service';
import { PrismaUsersRepository } from './prisma.users.repository';
import { PrismaClient } from '@prisma/client';

import { faker } from '@faker-js/faker';
import fakerBr from 'faker-br';

import { randomUUID } from 'crypto';
import {
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import CreateUserBody from './create-user-body';

describe('UsersController', () => {
  let controller: UsersController;
  let prismaService: PrismaService;
  let prismaUsersRepository: PrismaUsersRepository;

  beforeAll(async () => {
    prismaService = null;
    prismaUsersRepository = null;
    controller = null;
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      imports: [],
      providers: [PrismaService, PrismaUsersRepository, PrismaClient],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    prismaService = module.get<PrismaService>(PrismaService);
    prismaUsersRepository = module.get<PrismaUsersRepository>(
      PrismaUsersRepository,
    );
  });

  afterEach(() => jest.resetAllMocks());

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('index', () => {
    it('should return a paginated list of users ', async () => {
      const fakeUserOne = {
        id: randomUUID(),
        name: faker.name.fullName(),
        document: fakerBr.br.cpf(),
        birthdate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const fakeUserTwo = {
        id: randomUUID(),
        name: faker.name.fullName(),
        document: fakerBr.br.cpf(),
        birthdate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const expectedResponse = {
        data: [fakeUserOne, fakeUserTwo],
        page: 1,
        perPage: 2,
        totalItems: 2,
      };

      jest.spyOn(prismaService.user, 'count').mockReturnValue(2);

      jest
        .spyOn(prismaService.user, 'findMany')
        .mockResolvedValue([fakeUserOne, fakeUserTwo]);

      const result = await controller.index(1, 2);

      expect(result).toEqual(expectedResponse);
    });
  });

  describe('find', () => {
    it('should return a user by document idenfication', async () => {
      const expectedResponse = {
        id: randomUUID(),
        name: faker.name.fullName(),
        document: fakerBr.br.cpf(),
        birthdate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest
        .spyOn(prismaService.user, 'findFirst')
        .mockResolvedValue(expectedResponse);

      const result = await controller.find(expectedResponse.document);

      expect(result).toEqual(expectedResponse);
    });

    it('should throw not found exception when user is not found', async () => {
      jest.spyOn(prismaService.user, 'findFirst').mockResolvedValue(null);

      expect(controller.find('21111111111')).rejects.toThrow(NotFoundException);
    });
  });

  describe('store', () => {
    it('should create a new user', async () => {
      const createUserBody: CreateUserBody = {
        name: faker.name.fullName(),
        document: fakerBr.br.cpf(),
        birthdate: new Date(),
      };

      jest.spyOn(prismaService.user, 'findFirst').mockResolvedValue(null);

      const result = await controller.store(createUserBody);

      expect(result).toEqual(expect.objectContaining(createUserBody));
    });

    it('should be throw UnprocessableEntity if user exists', async () => {
      jest.spyOn(prismaService.user, 'findFirst').mockResolvedValue({});

      try {
        await controller.store({
          name: faker.name.fullName(),
          document: '12345678901',
          birthdate: new Date(),
        });
      } catch (error) {
        expect(error).toBeInstanceOf(UnprocessableEntityException);
        expect(error.message).toBe('User already exists');
      }
    });
  });
});
