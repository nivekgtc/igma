import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
  UnprocessableEntityException,
} from '@nestjs/common';

import { PrismaService } from '../config/database/prisma.service';
import CreateUserBody from './create-user-body';
import { cleanStringDigits } from 'src/utils/clean-string';
import { Paginated } from 'src/utils/paginated';
import { User } from '@prisma/client';
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('igma')
@Controller('users')
export class UsersController {
  constructor(private readonly prisma: PrismaService) {}

  @ApiQuery({
    name: 'page',
    example: 1,
    required: false,
  })
  @ApiQuery({
    name: 'limit',
    example: 10,
    required: false,
  })
  @Get('')
  async index(
    @Query('page') page,
    @Query('limit') limit = 10,
  ): Promise<Paginated<User>> {
    if (!page) page = 1;

    const skip = (page - 1) * Number(limit);

    const [data, totalItems] = await Promise.all([
      this.prisma.user.findMany({
        skip,
        take: Number(limit),
      }),
      this.prisma.user.count(),
    ]);

    return {
      data,
      page,
      perPage: limit,
      totalItems,
    };
  }

  @ApiParam({ name: 'document', example: '24560257760' })
  @Get('/:document')
  async find(@Param('document') document) {
    const parsedDocument = cleanStringDigits(document);

    const userExists = await this.prisma.user.findFirst({
      where: { document: parsedDocument },
    });

    if (!userExists) throw new NotFoundException('User not found');

    return userExists;
  }

  @Post('')
  async store(@Body() user: CreateUserBody) {
    const userAlreadyExists = await this.prisma.user.findFirst({
      where: { document: cleanStringDigits(user.document) },
    });

    if (userAlreadyExists) {
      throw new UnprocessableEntityException('User already exists');
    }

    return this.prisma.user.create({
      data: { ...user, document: cleanStringDigits(user.document) },
    });
  }
}
