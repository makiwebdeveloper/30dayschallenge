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
