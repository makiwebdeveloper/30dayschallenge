import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Patch,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { UpdateUserDto } from './users.dto';
import { CookieService } from 'src/auth/cookie.service';
import { Response } from 'express';
import { Session } from 'src/auth/session.decorator';
import { GetSessionDto } from 'src/auth/auth.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private cookieService: CookieService,
  ) {}

  @ApiOkResponse()
  @ApiQuery({
    name: 'username',
    type: String,
    required: false,
  })
  @Get()
  @UseGuards(AuthGuard)
  async getUsers(@Query('username') username?: string) {
    return this.usersService.getUsers(username);
  }

  @ApiOkResponse()
  @Get(':id')
  @UseGuards(AuthGuard)
  async findUserById(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @ApiOkResponse()
  @Patch(':id')
  @UseGuards(AuthGuard)
  async updateUser(
    @Param('id') id: string,
    @Body() body: UpdateUserDto,
    @Session() session: GetSessionDto,
  ) {
    if (session.id !== id) {
      throw new ForbiddenException();
    }

    return this.usersService.update(id, body);
  }

  @ApiOkResponse()
  @Delete(':id')
  @UseGuards(AuthGuard)
  async deleteUser(
    @Param('id') id: string,
    @Res({ passthrough: true }) res: Response,
    @Session() session: GetSessionDto,
  ) {
    if (session.id !== id) {
      throw new ForbiddenException();
    }

    await this.usersService.delete(id);

    this.cookieService.removeToken(res);
  }
}
