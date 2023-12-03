import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ChallengesService } from './challenges.service';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { CreateChallengeDto, UpdateChallangeDto } from './challenges.dto';
import { Session } from 'src/auth/session.decorator';
import { GetSessionDto } from 'src/auth/auth.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('Challenges')
@Controller('challenges')
export class ChallengesController {
  constructor(private challengesService: ChallengesService) {}

  @ApiCreatedResponse()
  @Post()
  @UseGuards(AuthGuard)
  async createChallenge(@Body() body: CreateChallengeDto) {
    return this.challengesService.create(body);
  }

  @ApiOkResponse()
  @Delete('delete/:id')
  @UseGuards(AuthGuard)
  async deleteChallenge(@Param('id') id: string) {
    return this.challengesService.delete(id);
  }

  @ApiOkResponse()
  @Delete('quit/:memberChallengeId')
  @UseGuards(AuthGuard)
  async quitChallenge(@Param('memberChallengeId') memberChallengeId: string) {
    return this.challengesService.quit(memberChallengeId);
  }

  @ApiOkResponse()
  @Patch(':id')
  @UseGuards(AuthGuard)
  async updateChallenge(
    @Session() session: GetSessionDto,
    @Param('id') id: string,
    @Body() body: UpdateChallangeDto,
  ) {
    return this.challengesService.update(session.id, id, body);
  }

  @ApiOkResponse()
  @Get(':id')
  @UseGuards(AuthGuard)
  async findChallengeById(@Param('id') id: string) {
    return this.challengesService.findChallengeById(id);
  }

  @ApiOkResponse()
  @ApiQuery({
    name: 'userId',
    type: String,
    required: false,
  })
  @Get()
  @UseGuards(AuthGuard)
  async getChallenges(@Query('userId') userId?: string) {
    return this.challengesService.getChallengesByUserId(userId);
  }
}
