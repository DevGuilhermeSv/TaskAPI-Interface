import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from '../dto/user.dto';

@Injectable()
export class UsersService {
  async create(userDto: UserDto) {
    const user = await this.userRepository.findOne({
      where: {
        userName: userDto.userName,
      },
    });
    if (user != null) throw new BadRequestException();
    const createUser = await this.userRepository.create(userDto);
    return await this.userRepository.save(createUser);
  }
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async findOne(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({
      where: {
        userName: username,
      },
    });
  }
}
