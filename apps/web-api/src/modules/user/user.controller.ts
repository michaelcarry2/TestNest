import { IUser, User, UserCallerService } from '@Libs/user-caller';
import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserTransformPipe } from './pipes/create-user-tranforms.pipe';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { tryit } from 'radash';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userCallerService: UserCallerService) {}

  @Post()
  async create(
    @Body(CreateUserTransformPipe) body: CreateUserDto,
  ): Promise<any> {
    return this.userCallerService.create(body);
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
