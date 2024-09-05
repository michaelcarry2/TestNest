import { Cart, cartSchema } from './modules/cart/schema/cart.schema';
import {
  Product,
  productSchema,
} from './modules/product/schemas/product.schema';

export const PRODUCT_PROJECT = 'product-project';

export const productServiceModel = [
  {
    name: Product.name,
    schema: productSchema,
  },
  {
    name: Cart.name,
    schema: cartSchema,
  },
];

export const connectionName = 'product';
