import { Injectable } from '@nestjs/common';
import { Product } from './schemas/product.schema';
import { connectionName } from '../../constant';
import { FilterQuery, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name, connectionName)
    private readonly productModel: Model<Product>,
  ) {}

  async create(product: Product): Promise<Product> {
    return this.productModel.create(product);
  }

  async getByProductId(productId: string): Promise<Product> {
    return this.productModel.findOne({ productId });
  }

  async getAllProducts(payload: FilterQuery<Product>): Promise<Product[]> {
    return this.productModel.find(payload).lean();
  }

  async updateProduct(payload: {
    productId: string;
    update: Product;
  }): Promise<Product> {
    const { productId, update } = payload;

    return this.productModel.findOneAndUpdate(
      { productId },
      { ...update },
      { new: true },
    );
  }

  async deleteProduct(productId: string): Promise<Product> {
    return this.productModel.findOneAndDelete({ productId });
  }
}
