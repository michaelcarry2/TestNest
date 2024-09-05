import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { ProductCallerService } from '../product-caller.service';
import { IProduct } from '../interfaces/product.interface';
import { ICart } from '../interfaces/cart.interface';

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
