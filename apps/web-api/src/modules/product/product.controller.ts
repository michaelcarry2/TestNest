import {
  GetProductByProductIdValidatePipe,
  IProduct,
  ProductCallerService,
} from '@Libs/product-caller';
import { Controller, Get, Logger, Param, Query } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { QueryProductDto } from './dtos/query-product.dto';

@Controller('product')
@ApiTags('Product')
export class ProductController {
  private logger = new Logger(ProductController.name);
  constructor(private readonly productCallerService: ProductCallerService) {}

  @Get(':productId')
  @ApiParam({ name: 'productId' })
  async getByProductId(
    @Param(GetProductByProductIdValidatePipe) product: IProduct,
  ): Promise<IProduct> {
    return product;
  }

  @Get()
  async getAllProduct(@Query() query: QueryProductDto): Promise<IProduct[]> {
    return this.productCallerService.getAllProducts(query);
  }
}
