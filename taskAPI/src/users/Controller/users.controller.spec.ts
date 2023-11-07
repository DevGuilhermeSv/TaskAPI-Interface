import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from '../Service/users.service';
import { UserDto } from '../dto/user.dto';
import { User } from '../entities/user.entity';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    })
      .useMocker((token) => {
        if (token == 'UserRepository') {
          return {
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
          };
        }
      })
      .compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should be create a user', async () => {
    //Arrange
    const userDto: UserDto = new UserDto();
    const user = new User();

    jest.spyOn(service, 'create').mockResolvedValue(user);
    //Act
    const result = await controller.register(userDto);

    //Assert
    expect(result).toEqual(user);
    expect(service.create).toHaveBeenCalled();
  });
});
