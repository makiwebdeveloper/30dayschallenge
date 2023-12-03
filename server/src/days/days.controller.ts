import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { DaysService } from './days.service';
import { UpdateDayDto } from './days.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Session } from 'src/auth/session.decorator';
import { GetSessionDto } from 'src/auth/auth.dto';

@ApiTags('Days')
@Controller('days')
export class DaysController {
  constructor(private daysService: DaysService) {}

  @ApiOkResponse()
  @Patch(':id')
  @UseGuards(AuthGuard)
  async updateDay(
    @Session() session: GetSessionDto,
    @Param('id') id: string,
    @Body() body: UpdateDayDto,
  ) {
    return this.daysService.update(session.id, id, body);
  }

  @ApiOkResponse()
  @Get(':id')
  @UseGuards(AuthGuard)
  async getDayById(@Param('id') id: string) {
    return this.daysService.findDayById(id);
  }
}
