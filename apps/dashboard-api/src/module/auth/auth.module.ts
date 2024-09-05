import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UserCallerModule } from '@Libs/user-caller';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthController } from './auth.controller';

const service = [AuthService];

@Module({
  imports: [UserCallerModule],
  controllers: [AuthController],
  providers: [...service, JwtService, JwtStrategy, LocalStrategy],
  exports: [...service, JwtService, JwtStrategy, LocalStrategy],
})
export class AuthModule {}
