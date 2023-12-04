import { Module } from '@nestjs/common';
import { DaysService } from './days.service';
import { DbModule } from 'src/db/db.module';
import { DaysController } from './days.controller';

@Module({
  imports: [DbModule],
  providers: [DaysService],
  exports: [DaysService],
  controllers: [DaysController],
})
export class DaysModule {}
