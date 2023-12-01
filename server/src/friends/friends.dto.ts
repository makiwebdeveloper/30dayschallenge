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

export class CreateFriendshipRequestDto {
  @ApiProperty({
    example: 'to-user-id',
  })
  @IsNotEmpty()
  toUserId: string;
}

export class AcceptFriendshipRequestDto {
  @ApiProperty({
    example: 'from-user-id',
  })
  @IsNotEmpty()
  fromUserId: string;
}

export class CancelFriendshipRequestDto {
  @ApiProperty({
    example: 'from-user-id',
  })
  @IsNotEmpty()
  fromUserId: string;
}
