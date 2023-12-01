import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DbModule } from 'src/db/db.module';
import { CookieService } from 'src/auth/cookie.service';

@Module({
  imports: [DbModule],
  providers: [UsersService, CookieService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
