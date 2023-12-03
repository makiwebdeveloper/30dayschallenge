import { Module } from '@nestjs/common';
import { ChallengesService } from './challenges.service';
import { ChallengesController } from './challenges.controller';
import { DbModule } from 'src/db/db.module';
import { DaysModule } from 'src/days/days.module';

@Module({
  imports: [DbModule, DaysModule],
  providers: [ChallengesService],
  controllers: [ChallengesController],
})
export class ChallengesModule {}
