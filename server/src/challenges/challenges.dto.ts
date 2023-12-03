import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export class CreateChallengeDto {
  @ApiProperty({
    example: 'Sport',
  })
  @IsNotEmpty()
  @MaxLength(32)
  title: string;

  @ApiProperty({
    example: 'Just do 30 push ups every day!',
  })
  @IsNotEmpty()
  @IsOptional()
  @MaxLength(64)
  description?: string;

  @ApiProperty({
    example: 'creator-id',
  })
  @IsNotEmpty()
  creatorId: string;
}

export class UpdateChallangeDto {
  @ApiProperty({
    example: 'No smoking',
  })
  @IsNotEmpty()
  @MaxLength(32)
  title: string;

  @ApiProperty({
    example: 'Smoking kills you!',
  })
  @IsNotEmpty()
  @IsOptional()
  @MaxLength(64)
  description?: string;
}
