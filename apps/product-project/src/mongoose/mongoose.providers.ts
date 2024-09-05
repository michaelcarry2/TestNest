import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';
import { connectionName } from '../constant';

export const mongooseModuleAsyncOptions: MongooseModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  connectionName: connectionName,
  useFactory: async (configService: ConfigService) => {
    return {
      uri: configService.get<string>('database.host'),
      ...configService.get<any>('database.options'),
    };
  },
};
