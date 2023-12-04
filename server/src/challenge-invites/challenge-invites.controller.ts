import { Body, Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';
import { ChallengeInvitesService } from './challenge-invites.service';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { Session } from 'src/auth/session.decorator';
import { GetSessionDto } from 'src/auth/auth.dto';
import { AcceptInviteDto, CreateInviteDto } from './challenge-invite.dto';

@ApiTags('Challenge Invites')
@Controller('challenge-invites')
export class ChallengeInvitesController {
  constructor(private challengeInvitesService: ChallengeInvitesService) {}

  @ApiCreatedResponse()
  @Post()
  @UseGuards(AuthGuard)
  async createInvite(
    @Session() session: GetSessionDto,
    @Body() body: CreateInviteDto,
  ) {
    return this.challengeInvitesService.create({
      fromUserId: session.id,
      ...body,
    });
  }

  @ApiOkResponse()
  @Post('accept')
  @UseGuards(AuthGuard)
  async accept(
    @Session() session: GetSessionDto,
    @Body() body: AcceptInviteDto,
  ) {
    return this.challengeInvitesService.accept({
      toUserId: session.id,
      ...body,
    });
  }

  @ApiOkResponse()
  @Delete('cancel')
  @UseGuards(AuthGuard)
  async cancel(
    @Session() session: GetSessionDto,
    @Body() body: AcceptInviteDto,
  ) {
    return this.challengeInvitesService.accept({
      toUserId: session.id,
      ...body,
    });
  }

  @ApiOkResponse()
  @Get()
  @UseGuards(AuthGuard)
  async getInvites(@Session() session: GetSessionDto) {
    return this.challengeInvitesService.getInvites(session.id);
  }
}
