import { Controller, Logger } from '@nestjs/common';
import { UserService } from './users.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { User } from './schemas/users.schema';
import { IUpdateUser } from './interfaces/update-user.interface';

@Controller()
export class UserController {
  private readonly logger = new Logger(UserController.name);
  constructor(private readonly userService: UserService) {}

  @MessagePattern({
    cmd: 'user',
    method: 'create',
  })
  async create(@Payload() payload: User): Promise<User> {
    return this.userService.create(payload);
  }

  @MessagePattern({
    cmd: 'user',
    method: 'getUserByUsername',
  })
  async getUserByUsername(@Payload() username: string): Promise<User> {
    return this.userService.getUserByUsername(username);
  }

  @MessagePattern({
    cmd: 'user',
    method: 'updateUser',
  })
  async updateUser(@Payload() update: IUpdateUser): Promise<User> {
    return this.userService.updateUser(update);
  }
}
