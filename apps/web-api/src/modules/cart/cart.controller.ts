import { IProduct, ProductCallerService } from '@Libs/product-caller';
import { ICart } from '@Libs/product-caller/interfaces/cart.interface';
import { GetCartByCartIdValidatePipe } from '@Libs/product-caller/pipes/get-cart-by-cart-id-validate.pipe';
import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { QueryProductDto } from '../product/dtos/query-product.dto';
import { QueryCartDto } from './dtos/create-cart.dto';

@Controller('cart')
@ApiTags('Cart')
export class CartController {
  private logger = new Logger(CartController.name);
  constructor(private readonly productCallerService: ProductCallerService) {}

  @Get(':carttId')
  @ApiParam({ name: 'carttId' })
  async getByProductId(
    @Param(GetCartByCartIdValidatePipe) product: ICart,
  ): Promise<ICart> {
    return product;
  }

  @Get()
  async getAllProduct(@Query() query: QueryProductDto): Promise<IProduct[]> {
    return this.productCallerService.getAllProducts(query);
  }

  @Post()
  async createCart(@Body() body: any): Promise<ICart> {
    return this.productCallerService.createCart(body);
  }
}
