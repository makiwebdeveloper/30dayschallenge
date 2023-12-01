import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CookieService } from './cookie.service';
import { GetSessionDto, SignInDto, SignUpDto } from './auth.dto';
import { Response } from 'express';
import { Session } from './session.decorator';
import { AuthGuard } from './auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private cookieService: CookieService,
  ) {}

  @ApiCreatedResponse()
  @Post('sign-up')
  async signUp(
    @Body() body: SignUpDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken } = await this.authService.signUp(body);

    this.cookieService.setToken(res, accessToken);
  }

  @ApiOkResponse()
  @Post('sign-in')
  async signIn(
    @Body() body: SignInDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken } = await this.authService.signIn(body);

    this.cookieService.setToken(res, accessToken);
  }

  @ApiOkResponse()
  @Post('sign-out')
  @UseGuards(AuthGuard)
  async signOut(@Res({ passthrough: true }) res: Response) {
    this.cookieService.removeToken(res);
  }

  @ApiOkResponse()
  @Get('session')
  @UseGuards(AuthGuard)
  async getSession(@Session() session: GetSessionDto) {
    return session;
  }
}
