import { UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';

import { AuthService } from './auth.service'; // Substitua pelo caminho correto
import { User } from '../../users/entities/user.entity';
import { UsersService } from '../../users/Service/users.service';

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UsersService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, UsersService, JwtService],
    })
      .useMocker((token) => {
        if (token == 'UserRepository')
          return { findOne: jest.fn((entity) => entity) };
      })
      .compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should sign in a user', async () => {
    // Arrange
    const userName = 'testuser';
    const password = 'testpassword';

    const mockUser = {
      id: 1,
      userName: userName,
      password: password,
    };

    const mockAccessToken = 'mockAccessToken';

    jest.spyOn(userService, 'findOne').mockResolvedValue(mockUser as User);
    jest.spyOn(jwtService, 'signAsync').mockResolvedValue(mockAccessToken);

    // Act
    const result = await authService.signIn(userName, password);

    // Assert
    expect(userService.findOne).toHaveBeenCalledWith(userName);
    expect(jwtService.signAsync).toHaveBeenCalledWith({
      sub: mockUser.id,
      username: mockUser.userName,
    });
    expect(result).toEqual({ access_token: mockAccessToken });
  });

  it('should throw UnauthorizedException when the password is incorrect', async () => {
    // Arrange
    const userName = 'testuser';
    const password = 'incorrectpassword';

    const mockUser = {
      id: 1,
      userName: userName,
      password: 'correctpassword',
    };

    jest.spyOn(userService, 'findOne').mockResolvedValue(mockUser as User);

    // Act and Assert
    await expect(authService.signIn(userName, password)).rejects.toThrowError(
      UnauthorizedException,
    );
  });
});
