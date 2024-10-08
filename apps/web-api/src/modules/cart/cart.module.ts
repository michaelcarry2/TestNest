import { Module } from '@nestjs/common';
import { ProductCallerModule } from '@Libs/product-caller';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';

@Module({
  imports: [ProductCallerModule],
  controllers: [CartController],
  providers: [CartService],
  exports: [CartService],
})
export class CartModule {}
