import { IProduct } from './product.interface';

export interface UpdateProductInterface {
  productId: string;
  update: IProduct;
}
