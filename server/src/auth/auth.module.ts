import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { CookieService } from './cookie.service';
import { PasswordService } from './password.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '7d' },
    }),
    UsersModule,
  ],
  providers: [AuthService, CookieService, PasswordService],
  controllers: [AuthController],
})
export class AuthModule {}
