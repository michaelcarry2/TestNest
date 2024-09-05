import { IProduct } from './product.interface';

export enum CartStatusEnum {
  SUCCESS = 'success',
  WAITING = 'waiting',
}

export interface ICart {
  cartId?: string;
  product: Pick<IProduct, 'productId' | 'productName' | 'brand'>;
  totalPrice: number;
  amount: number;
  status?: CartStatusEnum;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
}
