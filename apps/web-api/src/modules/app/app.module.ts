import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from 'apps/web-api/configuration/configuration';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: ['apps/web-api/.env', '.env'],
    }),
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
