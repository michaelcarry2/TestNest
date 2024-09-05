import { ProductCallerModule } from '@Libs/product-caller';
import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';

@Module({
  imports: [ProductCallerModule],
  controllers: [ProductController],
})
export class ProductModule {}
