import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { connectionName, productServiceModel } from '../../constant';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  imports: [MongooseModule.forFeature(productServiceModel, connectionName)],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
