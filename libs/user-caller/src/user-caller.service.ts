import { Inject, Injectable } from '@nestjs/common';
import { AuthCommands, UserCommands, UserServiceRMQ } from '../constant';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { JwtSignInterface } from './interfaces/jwt-sign.interface';
import { IUser } from './interfaces/user.interface';

@Injectable()
export class UserCallerService {
  constructor(
    @Inject(UserServiceRMQ.name) private readonly rmqUserService: ClientProxy,
  ) {}

  create = async (payload: any): Promise<any> => {
    return lastValueFrom(
      this.rmqUserService.send(UserCommands.createUser, payload),
    );
  };

  getByUsername = async (username: string): Promise<any> => {
    return lastValueFrom(
      this.rmqUserService.send(UserCommands.getUserByUsername, username),
    );
  };

  updateUser = async (update: {
    username: string;
    roles: string;
  }): Promise<any> => {
    return lastValueFrom(
      this.rmqUserService.send(UserCommands.updateUser, update),
    );
  };

  loginUser = async (payload: { user: IUser }): Promise<JwtSignInterface> => {
    return lastValueFrom(this.rmqUserService.send(AuthCommands.login, payload));
  };
}
