import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { DaysService } from 'src/days/days.service';
import { DbService } from 'src/db/db.service';
import { CreateChallengeDto, UpdateChallangeDto } from './challenges.dto';
import {
  ChallengeSelect,
  IChallenge,
  MemberChallengeSelect,
} from './challenges.types';
import { UserSelect } from 'src/users/users.types';

@Injectable()
export class ChallengesService {
  constructor(private db: DbService, private daysService: DaysService) {}

  async create(data: CreateChallengeDto): Promise<IChallenge> {
    const challange = await this.db.challenge.create({ data });

    const memberChallenge = await this.db.memberChallenge.create({
      data: {
        userId: challange.creatorId,
        challengeId: challange.id,
      },
    });

    for (let number = 1; number <= 30; number++) {
      this.daysService.create({
        number,
        memberChallengeId: memberChallenge.id,
      });
    }

    return this.findChallengeById(challange.id);
  }

  async delete(id: string): Promise<void> {
    await this.db.challenge.delete({ where: { id } });
  }

  async quit(memberChallengeId: string): Promise<void> {
    await this.db.memberChallenge.delete({ where: { id: memberChallengeId } });
  }

  async update(
    userId: string,
    challengeId: string,
    data: UpdateChallangeDto,
  ): Promise<void> {
    const challenge = await this.findChallengeById(challengeId);

    if (!challenge) {
      throw new BadRequestException();
    }

    if (challenge.creator.id !== userId) {
      throw new ForbiddenException();
    }

    await this.db.challenge.update({
      where: { id: challengeId },
      data,
    });
  }

  async findChallengeById(id: string): Promise<IChallenge | undefined> {
    const challenge = await this.db.challenge.findUnique({
      where: { id },
      select: {
        ...ChallengeSelect,
        creator: {
          select: UserSelect,
        },
        members: {
          select: MemberChallengeSelect,
        },
      },
    });

    if (!challenge) {
      return undefined;
    }

    return challenge;
  }

  async getChallengesByUserId(userId: string): Promise<IChallenge[]> {
    const challenges = await this.db.challenge.findMany({
      select: {
        ...ChallengeSelect,
        creator: {
          select: UserSelect,
        },
        members: {
          select: MemberChallengeSelect,
        },
      },
    });

    return challenges.filter((challenge) =>
      challenge.members.find((member) => member.userId === userId),
    );
  }
}
