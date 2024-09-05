import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { ICart } from '../interfaces/cart.interface';
import { ProductCallerService } from '@Libs/product-caller';

@Injectable()
export class GetCartByCartIdValidatePipe implements PipeTransform {
  constructor(private readonly productCallerService: ProductCallerService) {}

  async transform(value: { cartId: string }): Promise<ICart> {
    const cart = await this.productCallerService.getByCartId(value.cartId);
    if (!cart) {
      throw new BadRequestException(`CartId ${value.cartId} Not Found`);
    }
    return cart;
  }
}
