import {
  GetProductByProductIdValidatePipe,
  IProduct,
  ProductCallerService,
} from '@Libs/product-caller';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Logger,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { tryit } from 'radash';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { QueryProductDto } from './dtos/query-product.dto';

@Controller('product')
@ApiTags('Product')
export class ProductController {
  private logger = new Logger(ProductController.name);
  constructor(private readonly productCallerService: ProductCallerService) {}

  @Post()
  async createProduct(@Body() body: CreateProductDto): Promise<IProduct> {
    return this.productCallerService.create(body);
  }

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

  @Put(':productId')
  @ApiParam({ name: 'productId' })
  async updateProduct(
    @Param(GetProductByProductIdValidatePipe) product: IProduct,
    @Body() body: UpdateProductDto,
  ): Promise<IProduct> {
    return this.productCallerService.updateProduct({
      productId: product.productId,
      update: body,
    });
  }

  @Delete(':productId')
  @ApiParam({ name: 'productId' })
  async deleteProduct(
    @Param(GetProductByProductIdValidatePipe) product: IProduct,
  ): Promise<{ message: string }> {
    const { productId } = product;
    await this.productCallerService.deleteProduct(productId);
    return { message: 'Delete Successfully' };
  }
}
