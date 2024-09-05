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
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { CartService } from './cart.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { QueryCartDto } from './dtos/create-cart.dto';
import { IUser, User } from '@Libs/user-caller';

@Controller('checkout')
@ApiTags('Checkout')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class CartController {
  private logger = new Logger(CartController.name);
  constructor(
    private readonly productCallerService: ProductCallerService,
    private readonly cartService: CartService,
  ) {}

  @Get(':cartId')
  @ApiParam({ name: 'cartId' })
  async getByProductId(
    @Param(GetCartByCartIdValidatePipe) cart: ICart,
  ): Promise<ICart> {
    return cart;
  }

  @Get()
  async getAllProduct(
    @User() user: IUser,
    @Query() query: ICart,
  ): Promise<ICart[]> {
    return this.productCallerService.getAllCarts({
      ...query,
      userId: user.userId,
    });
  }

  @Post()
  async checkout(
    @User() user: IUser,
    @Body() body: QueryCartDto,
  ): Promise<ICart> {
    const { productId, amount } = body;

    const data = {
      productId,
      cart: {
        amount,
      } as ICart,
    };

    const makeCart = await this.cartService.makeCart(data);

    return this.productCallerService.createCart({
      ...makeCart,
      userId: user.userId,
    });
  }
}
