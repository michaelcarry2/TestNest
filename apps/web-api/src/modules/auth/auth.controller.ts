import {
  IUser,
  JwtSignInterface,
  User,
  UserCallerService,
} from '@Libs/user-caller';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { LoginDto } from './dto/login.dto';
import { ApiBody } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly userCallerService: UserCallerService) {}

  @Post()
  @UseGuards(LocalAuthGuard)
  @ApiBody({
    type: LoginDto,
  })
  async login(@User() user: IUser): Promise<JwtSignInterface> {
    return this.userCallerService.loginUser({ user });
  }
}
