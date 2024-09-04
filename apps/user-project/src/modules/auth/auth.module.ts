import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

const service = [AuthService];

@Module({
  controllers: [AuthController],
  providers: [...service, JwtService],
  exports: [...service],
})
export class AuthModule {}
