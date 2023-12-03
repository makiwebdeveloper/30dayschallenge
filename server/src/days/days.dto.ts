import { ApiProperty } from '@nestjs/swagger';
import { Difficulty } from '@prisma/client';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class CreateDayDto {
  @IsNumber()
  number: number;

  @IsNotEmpty()
  memberChallengeId: string;
}

export class UpdateDayDto {
  @ApiProperty({
    example: 'This day was difficult but I made it!',
  })
  @IsOptional()
  feelings?: string;

  @ApiProperty({
    example: 'MEDIUM',
  })
  @IsEnum(Difficulty)
  @IsOptional()
  difficulty?: Difficulty;

  @ApiProperty({
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  completed?: boolean;
}
