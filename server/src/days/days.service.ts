import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { CreateDayDto } from './days.dto';

@Injectable()
export class DaysService {
  constructor(private db: DbService) {}

  async create(data: CreateDayDto) {
    return this.db.day.create({ data });
  }

  async getDaysByMemberChallengeid(memberChallengeId: string) {
    return this.db.day.findMany({
      where: { memberChallengeId },
    });
  }
}
