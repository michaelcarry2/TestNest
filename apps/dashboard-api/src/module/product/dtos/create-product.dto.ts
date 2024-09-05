import { BrandsEnum } from '@Libs/product-caller';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({
    example: 'BMW I8',
  })
  productName: string;

  @ApiProperty({
    example: 19000000,
  })
  price: number;

  @ApiProperty({
    example: 8,
  })
  amount: number;

  @ApiProperty({
    example: BrandsEnum.BMW,
  })
  brand: BrandsEnum;
}
