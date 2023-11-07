import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { Entity } from 'typeorm';

@Entity()
export class UserDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(30)
  userName: string;

  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(30)
  password: string;
}
