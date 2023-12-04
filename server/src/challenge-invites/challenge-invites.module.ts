import { Module } from '@nestjs/common';
import { ChallengeInvitesService } from './challenge-invites.service';
import { ChallengeInvitesController } from './challenge-invites.controller';
import { DbModule } from 'src/db/db.module';
import { DaysModule } from 'src/days/days.module';
import { FriendsModule } from 'src/friends/friends.module';

@Module({
  imports: [DbModule, DaysModule, FriendsModule],
  providers: [ChallengeInvitesService],
  controllers: [ChallengeInvitesController],
})
export class ChallengeInvitesModule {}
