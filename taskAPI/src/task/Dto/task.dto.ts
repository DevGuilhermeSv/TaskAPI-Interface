import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { Type } from 'class-transformer';

export class TaskDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(30)
  readonly title: string;

  @IsString()
  @MaxLength(30)
  readonly description: string;

  @IsNotEmpty()
  readonly status: boolean;

}
