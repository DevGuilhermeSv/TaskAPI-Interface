import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, HttpCode } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from '../Service/auth.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../users/Service/users.service';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, UsersService, JwtService],
    })
      .useMocker((token) => {
        if (token == 'UserRepository')
          return { findOne: jest.fn((entity) => entity) };
      })
      .compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  describe('signIn', () => {
    it('should sign in a user and return the result', async () => {
      // Arrange
      const signInDto = {
        username: 'testuser',
        password: 'testpassword',
      };

      const mockResult = { access_token: 'mockAccessToken' };

      jest.spyOn(authService, 'signIn').mockResolvedValue(mockResult);

      // Act
      const result = await authController.signIn(signInDto);

      // Assert
      expect(result).toEqual(mockResult);
    });
  });
});
