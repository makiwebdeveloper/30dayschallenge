import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AddFriendDto {
  @ApiProperty({
    example: 'friend-id',
  })
  @IsNotEmpty()
  friendId: string;
}

export class RemoveFriendDto {
  @ApiProperty({
    example: 'friend-id',
  })
  @IsNotEmpty()
  friendId: string;
}
