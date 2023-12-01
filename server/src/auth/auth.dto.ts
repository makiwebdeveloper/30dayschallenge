import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, NotContains } from 'class-validator';

export class SignUpDto {
  @ApiProperty({
    example: 'johnwatson',
  })
  @IsNotEmpty()
  @NotContains(' ')
  username: string;

  @ApiProperty({
    example: '123456',
  })
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: 'John Watson',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'https://website.com/image-url.jpg',
  })
  @IsNotEmpty()
  imageUrl: string;
}

export class SignInDto {
  @ApiProperty({
    example: 'johnwatson',
  })
  @IsNotEmpty()
  @NotContains(' ')
  username: string;

  @ApiProperty({
    example: '123456',
  })
  @IsNotEmpty()
  password: string;
}

export class GetSessionDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  iat: number;

  @ApiProperty()
  exp: number;
}
