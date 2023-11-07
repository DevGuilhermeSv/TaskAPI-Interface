import { Module } from '@nestjs/common';
import { AuthController } from './Controller/auth.controller';
import { AuthService } from './Service/auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: 'THE SECRET KEY - DONT USE IT IN PRODUCTION',
      signOptions: { expiresIn: '5m' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
