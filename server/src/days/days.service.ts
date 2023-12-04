import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { CreateDayDto, UpdateDayDto } from './days.dto';
import { IDay } from './days.types';

@Injectable()
export class DaysService {
  constructor(private db: DbService) {}

  async create(data: CreateDayDto): Promise<IDay> {
    return this.db.day.create({ data });
  }

  async update(
    userId: string,
    dayId: string,
    data: UpdateDayDto,
  ): Promise<void> {
    const day = await this.db.day.findUnique({
      where: {
        id: dayId,
      },
      include: {
        memberChallenge: true,
      },
    });

    if (!day) {
      throw new BadRequestException();
    }

    if (day.memberChallenge.userId !== userId) {
      throw new ForbiddenException();
    }

    await this.db.day.update({
      where: { id: dayId },
      data,
    });
  }

  async findDayById(id: string): Promise<IDay | undefined> {
    const day = await this.db.day.findUnique({ where: { id } });

    if (!day) {
      return undefined;
    }

    return day;
  }

  async getDaysByMemberChallengeid(memberChallengeId: string): Promise<IDay[]> {
    return this.db.day.findMany({
      where: { memberChallengeId },
      orderBy: {
        number: 'asc',
      },
    });
  }
}
