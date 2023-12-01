import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { PasswordService } from './password.service';
import { JwtService } from '@nestjs/jwt';
import { SignInDto, SignUpDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private passwordService: PasswordService,
    private jwt: JwtService,
  ) {}

  async signUp(data: SignUpDto) {
    const user = await this.usersService.findByUsername(data.username);

    if (user) {
      throw new BadRequestException({ type: 'username-exist' });
    }

    const salt = this.passwordService.getSalt();
    const hash = this.passwordService.getHash(data.password, salt);

    const { password, ...restData } = data;
    const newUser = await this.usersService.create({
      ...restData,
      salt,
      passwordHash: hash,
    });

    const accessToken = await this.jwt.signAsync({
      id: newUser.id,
      username: newUser.username,
    });

    return { accessToken };
  }

  async signIn({ username, password }: SignInDto) {
    const user = await this.usersService.findByUsername(username);

    if (!user) {
      throw new UnauthorizedException();
    }

    const hash = this.passwordService.getHash(password, user.salt);

    if (hash !== user.passwordHash) {
      throw new BadRequestException();
    }

    const accessToken = await this.jwt.signAsync({
      id: user.id,
      username: user.username,
    });

    return { accessToken };
  }
}
