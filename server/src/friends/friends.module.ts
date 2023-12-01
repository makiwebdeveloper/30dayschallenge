import { Module } from '@nestjs/common';
import { FriendsController } from './friends.controller';
import { UsersModule } from 'src/users/users.module';
import { FriendsService } from './friends.service';
import { DbModule } from 'src/db/db.module';

@Module({
  imports: [DbModule, UsersModule],
  controllers: [FriendsController],
  providers: [FriendsService],
})
export class FriendsModule {}
