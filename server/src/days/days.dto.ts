import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateDayDto {
  @IsNumber()
  number: number;

  @IsNotEmpty()
  memberChallengeId: string;
}
