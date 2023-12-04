import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class InviteDto {
  @ApiProperty({
    example: 'from-user-id',
  })
  @IsNotEmpty()
  fromUserId: string;

  @ApiProperty({
    example: 'to-user-id',
  })
  @IsNotEmpty()
  toUserId: string;

  @ApiProperty({
    example: 'challenge-id',
  })
  @IsNotEmpty()
  challengeId: string;
}

export class CreateInviteDto {
  @ApiProperty({
    example: 'to-user-id',
  })
  @IsNotEmpty()
  toUserId: string;

  @ApiProperty({
    example: 'challenge-id',
  })
  @IsNotEmpty()
  challengeId: string;
}

export class AcceptInviteDto {
  @ApiProperty({
    example: 'to-user-id',
  })
  @IsNotEmpty()
  fromUserId: string;

  @ApiProperty({
    example: 'challenge-id',
  })
  @IsNotEmpty()
  challengeId: string;
}
