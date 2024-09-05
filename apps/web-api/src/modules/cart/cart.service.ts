import { BadRequestException, Injectable } from '@nestjs/common';
import { IProduct, ProductCallerService } from '@Libs/product-caller';
import { ICart } from '@Libs/product-caller/interfaces/cart.interface';

@Injectable()
export class CartService {
  constructor(private readonly productCallerService: ProductCallerService) {}

  makeCart = async (payload: {
    productId: string;
    cart: ICart;
  }): Promise<{ product: IProduct; amount: number; totalPrice: number }> => {
    const { productId, cart } = payload;
    const { amount } = cart;
    const product = await this.productCallerService.getByProductId(productId);
    if (!product) {
      throw new BadRequestException();
    }

    const productData: IProduct = {
      productId: product.productId,
      productName: product.productName,
      brand: product.brand,
    } as IProduct;

    if (amount > product.amount) {
      throw new BadRequestException();
    }

    const totalPrice = product.price * amount;

    await this.productCallerService.updateProduct({
      productId,
      update: { amount: -amount } as IProduct,
    });

    return {
      product: productData,
      amount,
      totalPrice,
    };
  };
}
