import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ProductService } from './product.service';
import { Product } from './schemas/product.schema';
import { FilterQuery } from 'mongoose';

@Controller()
export class ProductController {
  private readonly logger = new Logger(ProductController.name);
  constructor(private readonly productService: ProductService) {}

  @MessagePattern({
    cmd: 'product',
    method: 'create',
  })
  async create(@Payload() payload: Product): Promise<Product> {
    return this.productService.create(payload);
  }

  @MessagePattern({
    cmd: 'product',
    method: 'getByProductId',
  })
  async getByProductId(@Payload() productId: string): Promise<Product> {
    return this.productService.getByProductId(productId);
  }

  @MessagePattern({
    cmd: 'product',
    method: 'getAllProducts',
  })
  async getAllProducts(
    @Payload() payload: FilterQuery<Product>,
  ): Promise<Product[]> {
    return this.productService.getAllProducts(payload);
  }

  @MessagePattern({
    cmd: 'product',
    method: 'updateProduct',
  })
  async updateProduct(
    @Payload() payload: { productId: string; update: Product },
  ): Promise<Product> {
    return this.productService.updateProduct(payload);
  }

  @MessagePattern({
    cmd: 'product',
    method: 'deleteProduct',
  })
  async deleteProduct(@Payload() productId: string): Promise<Product> {
    return this.productService.deleteProduct(productId);
  }
}
