import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from '../../configuration/configuration';
import { MongooseModule } from '@nestjs/mongoose';
import { connectionName } from '../../constants';
import { mongooseModuleAsyncOptions } from '../../mongoose/mongoose.providers';
import { UsersModule } from '../user/users.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: ['apps/user-project/.env', '.env'],
    }),
    MongooseModule.forRootAsync(mongooseModuleAsyncOptions),
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
