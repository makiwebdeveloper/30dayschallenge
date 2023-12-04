import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  passwordHash: string;

  @IsNotEmpty()
  salt: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  imageUrl: string;
}

export class UpdateUserDto {
  @ApiProperty({
    example: 'Bob Willson',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'https://website.com/another-image.jpg',
  })
  @IsNotEmpty()
  imageUrl: string;
}
