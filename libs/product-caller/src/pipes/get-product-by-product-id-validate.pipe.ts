import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { ProductCallerService } from '../product-caller.service';
import { IProduct } from '../interfaces/product.interface';

@Injectable()
export class GetProductByProductIdValidatePipe implements PipeTransform {
  constructor(private readonly productCallerService: ProductCallerService) {}

  async transform(value: { productId: string }): Promise<IProduct> {
    const product = await this.productCallerService.getByProductId(
      value.productId,
    );
    if (!product) {
      throw new BadRequestException(`ProductId ${value.productId} Not Found`);
    }
    return product;
  }
}
