import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { ProductCallerModule } from '@Libs/product-caller';

@Module({
  imports: [ProductCallerModule],
  controllers: [CartController],
})
export class CartModule {}
