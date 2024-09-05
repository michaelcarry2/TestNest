import { BrandsEnum, IProduct } from '@Libs/product-caller';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class QueryCartDto {
  @ApiProperty({
    type: String,
    example: 'BMW I8',
  })
  @IsString()
  productId: string;

  @ApiPropertyOptional({
    type: Number,
  })
  @IsNumber()
  @IsOptional()
  amount: number;

  product?: IProduct;
  totalPrice?: number;
}
