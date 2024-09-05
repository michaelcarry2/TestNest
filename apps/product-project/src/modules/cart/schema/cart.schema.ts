import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Product } from '../../product/schemas/product.schema';
import { nanoid } from 'nanoid';

export enum CartStatusEnum {
  SUCCESS = 'success',
  WAITING = 'waiting',
}

@Schema({
  collection: 'cart',
  versionKey: false,
  timestamps: true,
})
export class Cart extends Document {
  @Prop({
    type: String,
    unique: true,
    index: true,
    default: () => nanoid(13),
  })
  cartId?: string;

  @Prop({
    type: Object,
    required: true,
  })
  product: Pick<Product, 'productId' | 'productName' | 'brand'>;

  @Prop({
    type: Number,
    required: true,
  })
  totalPrice: number;

  @Prop({
    type: Number,
    required: true,
  })
  amount: number;

  @Prop({
    type: String,
    enum: CartStatusEnum,
    default: CartStatusEnum.WAITING,
  })
  status?: CartStatusEnum;

  createdAt?: Date;
  updatedAt?: Date;
}

export const cartSchema = SchemaFactory.createForClass(Cart);
