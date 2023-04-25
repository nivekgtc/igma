import { Injectable } from '@nestjs/common';
import UsersRepository from 'src/domain/users.repository';
import CreateUserBody from './create-user-body';
import { Paginated } from 'src/utils/paginated';
import { PrismaClient, User } from '@prisma/client';

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private readonly prisma: PrismaClient) {}
  async findById(id: string): Promise<User> {
    throw new Error('Method not implemented.');
  }
  async index(paginated: Paginated<User>): Promise<Paginated<User>> {
    throw new Error('Method not implemented.');
  }

  async create(data: CreateUserBody): Promise<User> {
    return await this.prisma.user.create({ data });
  }
}
