import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/config/database/prisma.service';
import { PrismaUsersRepository } from './prisma.users.repository';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [UsersController],
  imports: [],
  providers: [PrismaService, PrismaUsersRepository, PrismaClient],
})
export class UsersModule {}
