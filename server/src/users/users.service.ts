import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { CreateUserDto, UpdateUserDto } from './users.dto';
import { User } from '@prisma/client';
import { IUser } from './users.types';

@Injectable()
export class UsersService {
  constructor(private db: DbService) {}

  async findByUsername(username: string): Promise<User | undefined> {
    const user = await this.db.user.findUnique({ where: { username } });

    if (!user) {
      return undefined;
    }

    return user;
  }

  async findById(id: string): Promise<IUser | undefined> {
    const user = await this.db.user.findUnique({ where: { id } });

    if (!user) {
      return undefined;
    }

    return this.formatUser(user);
  }

  async getUsers(username?: string): Promise<IUser[]> {
    const users = await this.db.user.findMany({
      where: {
        username: {
          contains: username,
        },
      },
    });

    const formattedUsers = users.map((user) => this.formatUser(user));

    return formattedUsers;
  }

  async create(data: CreateUserDto): Promise<IUser> {
    const user = await this.db.user.create({
      data,
    });

    return this.formatUser(user);
  }

  async update(userId: string, data: UpdateUserDto): Promise<IUser> {
    const user = await this.db.user.update({
      where: { id: userId },
      data,
    });

    return this.formatUser(user);
  }

  async delete(userId: string) {
    await this.db.user.delete({
      where: { id: userId },
    });
  }

  formatUser(user: User): IUser {
    const { passwordHash, salt, ...returnedUser } = user;

    return returnedUser;
  }
}
