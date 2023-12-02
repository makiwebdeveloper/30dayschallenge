import { Module } from '@nestjs/common';
import { DaysService } from './days.service';
import { DbModule } from 'src/db/db.module';

@Module({
  imports: [DbModule],
  providers: [DaysService],
  exports: [DaysService],
})
export class DaysModule {}
