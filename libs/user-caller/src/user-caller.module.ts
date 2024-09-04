import { Module } from '@nestjs/common';
import { UserCallerService } from './user-caller.service';
import { makeRMQClient } from '@Libs/microservice';
import { UserServiceRMQ } from '../constant';

@Module({
  providers: [makeRMQClient(UserServiceRMQ), UserCallerService],
  exports: [makeRMQClient(UserServiceRMQ), UserCallerService],
})
export class UserCallerModule {}
