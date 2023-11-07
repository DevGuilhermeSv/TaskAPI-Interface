import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from '../Service/users.service';
import { UserDto } from '../dto/user.dto';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('register')
  async register(@Body() userDto: UserDto) {
    return await this.userService.create(userDto);
  }
}
