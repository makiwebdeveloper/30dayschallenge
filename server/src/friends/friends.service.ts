import { BadRequestException, Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class FriendsService {
  constructor(private db: DbService, private usersService: UsersService) {}

  async add(userId: string, friendId: string) {
    if (userId === friendId) {
      throw new BadRequestException();
    }

    await this.db.user.update({
      where: { id: userId },
      data: {
        friends: {
          connect: {
            id: friendId,
          },
        },
      },
      include: {
        friends: true,
      },
    });

    await this.db.user.update({
      where: { id: friendId },
      data: {
        friends: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  async remove(userId: string, friendId: string) {
    if (userId === friendId) {
      throw new BadRequestException();
    }

    await this.db.user.update({
      where: { id: userId },
      data: {
        friends: {
          disconnect: {
            id: friendId,
          },
        },
      },
      include: {
        friends: true,
      },
    });

    await this.db.user.update({
      where: { id: friendId },
      data: {
        friends: {
          disconnect: {
            id: userId,
          },
        },
      },
    });
  }

  async getFriends(userId: string) {
    const user = await this.db.user.findUnique({
      where: { id: userId },
      include: { friends: true },
    });

    return user.friends.map((user) => this.usersService.formatUser(user));
  }
}
