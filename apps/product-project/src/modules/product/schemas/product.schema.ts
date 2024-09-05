import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { nanoid } from 'nanoid';

export enum BrandsEnum {
  BMW = 'bmw',
  BENZ = 'benz',
  FORD = 'ford',
  TOYOTA = 'toyota',
  HONDA = 'honda',
}

@Schema({
  collection: 'product',
  versionKey: false,
  timestamps: true,
})
export class Product extends Document {
  @Prop({
    type: String,
    unique: true,
    index: true,
    default: () => nanoid(13),
  })
  productId?: string;

  @Prop({
    type: String,
    index: true,
    required: true,
  })
  productName: string;

  @Prop({
    type: Number,
    required: true,
  })
  price: number;

  @Prop({
    type: Number,
    required: true,
  })
  amount: number;

  @Prop({
    type: [String],
    enum: BrandsEnum,
    required: true,
  })
  brand: BrandsEnum;

  createdAt?: Date;
  updatedAt?: Date;
}

export const productSchema = SchemaFactory.createForClass(Product);
