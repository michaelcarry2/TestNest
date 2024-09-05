import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from 'apps/dashboard-api/configuration/configuration';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { ProductModule } from '../product/product.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: ['apps/dashboard-api/.env', '.env'],
    }),
    UserModule,
    AuthModule,
    ProductModule,
  ],
})
export class AppModule {}
