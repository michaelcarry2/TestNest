import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { connectionName, productServiceModel } from '../../constant';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';

@Module({
  imports: [MongooseModule.forFeature(productServiceModel, connectionName)],
  controllers: [CartController],
  providers: [CartService],
  exports: [CartService],
})
export class CartModule {}
