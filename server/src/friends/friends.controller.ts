import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { GetSessionDto } from 'src/auth/auth.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Session } from 'src/auth/session.decorator';
import {
  AcceptFriendshipRequestDto,
  CancelFriendshipRequestDto,
  CreateFriendshipRequestDto,
} from './friends.dto';
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
  @Post('requests')
  @UseGuards(AuthGuard)
  async createFriendshipRequest(
    @Session() session: GetSessionDto,
    @Body() body: CreateFriendshipRequestDto,
  ) {
    await this.friendsService.createFriendshipRequest(
      session.id,
      body.toUserId,
    );

    return { message: 'Ok' };
  }

  @ApiOkResponse()
  @Get('requests')
  @UseGuards(AuthGuard)
  async getFriendshipRequests(@Session() session: GetSessionDto) {
    return this.friendsService.getFriendshipRequest(session.id);
  }

  @ApiOkResponse()
  @Post('accept')
  @UseGuards(AuthGuard)
  async acceptFriendshipRequest(
    @Session() session: GetSessionDto,
    @Body() body: AcceptFriendshipRequestDto,
  ) {
    await this.friendsService.acceptFriendshipRequest(
      session.id,
      body.fromUserId,
    );

    return { message: 'Ok' };
  }

  @ApiOkResponse()
  @Delete('cancel')
  @UseGuards(AuthGuard)
  async cancelFriendshipRequest(
    @Session() session: GetSessionDto,
    @Body() body: CancelFriendshipRequestDto,
  ) {
    await this.friendsService.cancelFriendshipRequest(
      session.id,
      body.fromUserId,
    );

    return { message: 'Ok' };
  }

  @ApiOkResponse()
  @Delete(':friendId')
  @UseGuards(AuthGuard)
  async removeFriend(
    @Session() session: GetSessionDto,
    @Param('friendId') friendId: string,
  ) {
    await this.friendsService.removeFriend(session.id, friendId);

    return { message: 'Ok' };
  }
}
