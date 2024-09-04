import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/users.schema';
import { connectionName } from '../../constants';
import { Model } from 'mongoose';
import { IUpdateUser } from './interfaces/update-user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name, connectionName)
    private readonly usersModel: Model<User>,
  ) {}

  async create(user: User): Promise<User> {
    return this.usersModel.create(user);
  }

  async getUserByUsername(username: string): Promise<User> {
    return this.usersModel.findOne({ username });
  }

  async updateUser(update: IUpdateUser): Promise<User> {
    const { username, roles } = update;
    return this.usersModel.findOneAndUpdate(
      { username },
      { roles },
      { returnDocument: 'after' },
    );
  }
}
