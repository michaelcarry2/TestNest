import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserCallerModule } from '@Libs/user-caller';

@Module({
  imports: [UserCallerModule],
  controllers: [UserController],
})
export class UserModule {}
