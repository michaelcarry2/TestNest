import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { connectionName, userServiceModel } from '../../constants';
import { UserService } from './users.service';
import { UserController } from './users.controller';

@Module({
  imports: [MongooseModule.forFeature(userServiceModel, connectionName)],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UsersModule {}
