import { Controller, Logger } from '@nestjs/common';
import { CartService } from './cart.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Cart } from './schema/cart.schema';
import { FilterQuery } from 'mongoose';

@Controller()
export class CartController {
  private readonly logger = new Logger(CartController.name);
  constructor(private readonly cartService: CartService) {}

  @MessagePattern({
    cmd: 'cart',
    method: 'create',
  })
  async create(@Payload() payload: Cart): Promise<Cart> {
    return this.cartService.create(payload);
  }

  @MessagePattern({
    cmd: 'cart',
    method: 'getCartById',
  })
  async getCartById(@Payload() cartId: string): Promise<Cart> {
    return this.cartService.getByCartId(cartId);
  }

  @MessagePattern({
    cmd: 'cart',
    method: 'getAllCarts',
  })
  async getAllCarts(@Payload() payload: FilterQuery<Cart>): Promise<Cart[]> {
    return this.cartService.getAllCarts(payload);
  }

  @MessagePattern({
    cmd: 'cart',
    method: 'updateCart',
  })
  async updateCart(
    @Payload() payload: { cartId: string; update: Cart },
  ): Promise<Cart> {
    return this.cartService.updateCart(payload);
  }

  @MessagePattern({
    cmd: 'cart',
    method: 'deleteCart',
  })
  async deleteCart(@Payload() cartId: string): Promise<Cart> {
    return this.cartService.deleteCart(cartId);
  }
}
