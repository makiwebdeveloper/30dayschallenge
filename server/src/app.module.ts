import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from './db/db.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { FriendsModule } from './friends/friends.module';
import { DaysModule } from './days/days.module';
import { ChallengesModule } from './challenges/challenges.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    DbModule,
    UsersModule,
    AuthModule,
    FriendsModule,
    DaysModule,
    ChallengesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
