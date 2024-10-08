import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from '../../configuration/configuration';
import { MongooseModule } from '@nestjs/mongoose';
import { mongooseModuleAsyncOptions } from '../../mongoose/mongoose.providers';
import { ProductModule } from '../product/product.module';
import { CartModule } from '../cart/cart.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: ['apps/product-project/.env', '.env'],
    }),
    MongooseModule.forRootAsync(mongooseModuleAsyncOptions),
    ProductModule,
    CartModule,
  ],
})
export class AppModule {}
