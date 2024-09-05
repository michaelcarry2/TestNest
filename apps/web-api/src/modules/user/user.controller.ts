import { IUser, User, UserCallerService } from '@Libs/user-caller';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  InternalServerErrorException,
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
import { tryit } from 'radash';

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
    const [error, user] = await tryit(this.userCallerService.getByUsername)(
      username,
    );
    if (error) {
      throw new InternalServerErrorException();
    }
    if (!user) {
      throw new BadRequestException('Username Not Found');
    }
    return user;
  }

  @Put()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async updateUser(
    @User() user: IUser,
    @Body() body: UpdateUserDto,
  ): Promise<any> {
    const [error, update] = await tryit(this.userCallerService.updateUser)({
      username: user.username,
      roles: body.roles,
    });
    if (error) {
      throw new InternalServerErrorException();
    }
    return update;
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async getMe(@User() user: IUser): Promise<any> {
    return user;
  }
}
