import { BadRequestException, Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { UsersService } from 'src/users/users.service';
import { IFriendshipRequest } from './friends.types';

@Injectable()
export class FriendsService {
  constructor(private db: DbService, private usersService: UsersService) {}

  async createFriendshipRequest(userId: string, toUserId: string) {
    if (userId === toUserId) {
      throw new BadRequestException();
    }

    const existRequest = await this.db.friendshipRequests.findUnique({
      where: {
        fromUserId_toUserId: {
          fromUserId: toUserId,
          toUserId: userId,
        },
      },
    });

    const isFriends = await this.checkIsFriends(userId, toUserId);

    if (isFriends) {
      throw new BadRequestException({ type: 'users-already-friends' });
    }

    if (existRequest) {
      throw new BadRequestException({ type: 'friendship-request-exist' });
    }

    await this.db.friendshipRequests.create({
      data: {
        fromUserId: userId,
        toUserId,
      },
    });
  }

  async acceptFriendshipRequest(userId: string, fromUserId: string) {
    if (userId === fromUserId) {
      throw new BadRequestException();
    }

    const request = await this.db.friendshipRequests.findUnique({
      where: {
        fromUserId_toUserId: {
          fromUserId,
          toUserId: userId,
        },
      },
    });

    if (!request) {
      throw new BadRequestException();
    }

    await this.addFriend(userId, fromUserId);

    await this.db.friendshipRequests.delete({
      where: {
        fromUserId_toUserId: {
          fromUserId,
          toUserId: userId,
        },
      },
    });
  }

  async cancelFriendshipRequest(userId: string, fromUserId: string) {
    if (userId === fromUserId) {
      throw new BadRequestException();
    }

    await this.db.friendshipRequests.delete({
      where: {
        fromUserId_toUserId: {
          fromUserId,
          toUserId: userId,
        },
      },
    });
  }

  async getFriendshipRequest(userId: string): Promise<IFriendshipRequest[]> {
    const friendshipRequests = await this.db.friendshipRequests.findMany({
      where: {
        toUserId: userId,
      },
      include: {
        fromUser: true,
      },
    });

    return friendshipRequests.map((request) => ({
      ...request,
      fromUser: this.usersService.formatUser(request.fromUser),
    }));
  }

  async addFriend(userId: string, friendId: string) {
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

  async removeFriend(userId: string, friendId: string) {
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

  async checkIsFriends(userId: string, friendId: string): Promise<boolean> {
    const user = await this.db.user.findUnique({
      where: { id: userId },
      include: { friends: true },
    });

    if (user.friends.find((friend) => friend.id === friendId)) {
      return true;
    } else {
      return false;
    }
  }
}
