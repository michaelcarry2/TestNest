import { IUser, User, UserCallerService } from '@Libs/user-caller';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { tryit } from 'radash';

@Controller('user')
@ApiTags('User')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userCallerService: UserCallerService) {}

  @Get(':username')
  async getByUsername(@Param('username') username: string): Promise<IUser> {
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

  @Put(':username')
  async updateUser(
    @Param('username') username: string,
    @Body() body: UpdateUserDto,
  ): Promise<any> {
    const [err, user] = await tryit(this.userCallerService.getByUsername)(
      username,
    );
    if (err) {
      throw new InternalServerErrorException();
    }
    if (!user) {
      throw new BadRequestException('Username Not Found');
    }

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
  async getMe(@User() user: IUser): Promise<any> {
    return user;
  }
}
