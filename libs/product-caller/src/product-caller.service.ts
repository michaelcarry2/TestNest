import { Inject, Injectable } from '@nestjs/common';
import { CartCommands, ProductCommands, ProductServeiceRMQ } from './constant';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { IProduct, IProductOption } from './interfaces/product.interface';
import { UpdateProductInterface } from './interfaces/update-product.interface';
import { ICart } from './interfaces/cart.interface';
import { QueryReportDto } from '../../../apps/dashboard-api/src/module/cart/dto/query-report.dto';

@Injectable()
export class ProductCallerService {
  constructor(
    @Inject(ProductServeiceRMQ.name)
    private readonly rmqProductService: ClientProxy,
  ) {}

  create = async (payload: IProduct): Promise<IProduct> => {
    return lastValueFrom(
      this.rmqProductService.send(ProductCommands.createProduct, payload),
    );
  };

  getByProductId = async (productId: string): Promise<IProduct> => {
    return lastValueFrom(
      this.rmqProductService.send(ProductCommands.getByProductId, productId),
    );
  };

  getAllProducts = async (payload: IProductOption): Promise<IProduct[]> => {
    return lastValueFrom(
      this.rmqProductService.send(ProductCommands.getAllProducts, payload),
    );
  };

  updateProduct = async (
    payload: UpdateProductInterface,
  ): Promise<IProduct> => {
    return lastValueFrom(
      this.rmqProductService.send(ProductCommands.updateProduct, payload),
    );
  };

  deleteProduct = async (productId: string): Promise<IProduct> => {
    return lastValueFrom(
      this.rmqProductService.send(ProductCommands.deleteProduct, productId),
    );
  };

  createCart = async (payload: ICart): Promise<ICart> => {
    return lastValueFrom(
      this.rmqProductService.send(CartCommands.createCart, payload),
    );
  };

  getByCartId = async (cartId: string): Promise<ICart> => {
    return lastValueFrom(
      this.rmqProductService.send(CartCommands.getByCartId, cartId),
    );
  };

  getAllCarts = async (payload: ICart): Promise<ICart[]> => {
    return lastValueFrom(
      this.rmqProductService.send(CartCommands.getAllCarts, payload),
    );
  };

  getReports = async (payload: QueryReportDto): Promise<ICart[]> => {
    return lastValueFrom(
      this.rmqProductService.send(CartCommands.getReports, payload),
    );
  };
}
