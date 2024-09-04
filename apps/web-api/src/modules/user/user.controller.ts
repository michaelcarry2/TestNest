import { IUser, User, UserCallerService } from '@Libs/user-caller';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserTransformPipe } from './pipes/create-user-tranforms.pipe';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userCallerService: UserCallerService) {}

  @Post()
  async create(
    @Body(CreateUserTransformPipe) body: CreateUserDto,
  ): Promise<any> {
    return this.userCallerService.create(body);
  }

  @Get(':username')
  async getByUsername(@Param('username') username: string): Promise<any> {
    return this.userCallerService.getByUsername(username);
  }

  @Put()
  async updateUser(@Body() body: UpdateUserDto): Promise<any> {
    return this.userCallerService.updateUser(body);
  }

  @Get('/me')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async getMe(@User() user: IUser): Promise<any> {
    console.log(user);
    return user;
  }
}
