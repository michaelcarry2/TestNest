import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cart } from './schema/cart.schema';
import { connectionName } from '../../constant';
import { FilterQuery, Model } from 'mongoose';
import { ICart } from '@Libs/product-caller/interfaces/cart.interface';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name, connectionName)
    private readonly cartModel: Model<Cart>,
  ) {}

  async create(cart: Cart): Promise<Cart> {
    return this.cartModel.create(cart);
  }

  async getByCartId(cartId: string): Promise<Cart> {
    return this.cartModel.findOne({ cartId });
  }

  async getAllCarts(payload: FilterQuery<Cart>): Promise<Cart[]> {
    return this.cartModel.find(payload).lean();
  }

  async updateCart(payload: { cartId: string; update: Cart }): Promise<Cart> {
    const { cartId, update } = payload;

    return this.cartModel.findOneAndUpdate(
      { cartId },
      { ...update },
      { new: true },
    );
  }

  async deleteCart(cartId: string): Promise<Cart> {
    return this.cartModel.findOneAndDelete({ cartId });
  }

  async getReports(payload: {
    startDate: string;
    endDate: string;
  }): Promise<ICart[]> {
    const { startDate, endDate } = payload;
    const query = {
      createdAt: {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      },
    };
    return this.cartModel.find(query).lean();
  }
}
