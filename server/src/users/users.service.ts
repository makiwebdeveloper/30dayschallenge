import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { CreateUserDto } from './users.dto';
import { User } from '@prisma/client';
import { IUser } from './users.types';

@Injectable()
export class UsersService {
  constructor(private db: DbService) {}

  async create(data: CreateUserDto): Promise<IUser> {
    const user = await this.db.user.create({
      data,
    });

    return this.formatUser(user);
  }

  async findByUsername(username: string) {
    return this.db.user.findUnique({ where: { username } });
  }

  formatUser(user: User): IUser {
    const { passwordHash, salt, ...returnedUser } = user;

    return returnedUser;
  }
}
