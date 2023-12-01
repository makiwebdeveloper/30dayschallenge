import { Body, Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { GetSessionDto } from 'src/auth/auth.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Session } from 'src/auth/session.decorator';
import { AddFriendDto, RemoveFriendDto } from './friends.dto';
import { FriendsService } from './friends.service';

@ApiTags('Friends')
@Controller('friends')
export class FriendsController {
  constructor(private friendsService: FriendsService) {}

  @ApiOkResponse()
  @Get()
  @UseGuards(AuthGuard)
  async getFriends(@Session() session: GetSessionDto) {
    return this.friendsService.getFriends(session.id);
  }

  @ApiOkResponse()
  @Post()
  @UseGuards(AuthGuard)
  async addFriend(
    @Session() session: GetSessionDto,
    @Body() body: AddFriendDto,
  ) {
    await this.friendsService.add(session.id, body.friendId);

    return { message: 'Ok' };
  }

  @ApiOkResponse()
  @Delete()
  @UseGuards(AuthGuard)
  async removeFriend(
    @Session() session: GetSessionDto,
    @Body() body: RemoveFriendDto,
  ) {
    await this.friendsService.remove(session.id, body.friendId);

    return { message: 'Ok' };
  }
}
