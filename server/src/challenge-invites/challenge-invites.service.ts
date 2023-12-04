import { BadRequestException, Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { InviteDto } from './challenge-invite.dto';
import { DaysService } from 'src/days/days.service';
import { FriendsService } from 'src/friends/friends.service';

@Injectable()
export class ChallengeInvitesService {
  constructor(
    private db: DbService,
    private daysService: DaysService,
    private friendsService: FriendsService,
  ) {}

  async create({ fromUserId, toUserId, challengeId }: InviteDto) {
    if (fromUserId === toUserId) {
      throw new BadRequestException();
    }

    const challenge = await this.db.challenge.findUnique({
      where: { id: challengeId },
    });

    if (!challenge) {
      throw new BadRequestException({ type: 'challenge-is-not-exist' });
    }

    const friends = await this.friendsService.getFriends(fromUserId);

    if (!friends.find((friend) => friend.id === toUserId)) {
      throw new BadRequestException({ type: 'user-is-not-your-friend' });
    }

    const existInvite = await this.db.challengeInvite.findUnique({
      where: {
        fromUserId_toUserId_challengeId: {
          fromUserId,
          toUserId,
          challengeId,
        },
      },
    });

    if (existInvite) {
      throw new BadRequestException({ type: 'challenge-invite-exist' });
    }

    await this.db.challengeInvite.create({
      data: {
        fromUserId,
        toUserId,
        challengeId,
      },
    });
  }

  async accept({ fromUserId, toUserId, challengeId }: InviteDto) {
    if (fromUserId === toUserId) {
      throw new BadRequestException();
    }

    const challenge = await this.db.challenge.findUnique({
      where: { id: challengeId },
    });

    if (!challenge) {
      throw new BadRequestException();
    }

    await this.addMember(toUserId, challengeId);

    await this.delete({ fromUserId, toUserId, challengeId });
  }

  async cancel({ fromUserId, toUserId, challengeId }: InviteDto) {
    if (fromUserId === toUserId) {
      throw new BadRequestException();
    }

    await this.delete({ fromUserId, toUserId, challengeId });
  }

  async addMember(userId: string, challengeId: string) {
    const memberChallenge = await this.db.memberChallenge.create({
      data: {
        userId,
        challengeId,
      },
    });

    for (let number = 1; number <= 30; number++) {
      this.daysService.create({
        number,
        memberChallengeId: memberChallenge.id,
      });
    }
  }

  async delete(data: InviteDto) {
    await this.db.challengeInvite.delete({
      where: {
        fromUserId_toUserId_challengeId: {
          ...data,
        },
      },
    });
  }

  async getInvites(userId: string) {
    return this.db.challengeInvite.findMany({
      where: {
        toUserId: userId,
      },
    });
  }
}
