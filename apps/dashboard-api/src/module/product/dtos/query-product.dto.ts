import { BrandsEnum } from '@Libs/product-caller';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class QueryProductDto {
  @ApiPropertyOptional({
    type: String,
    example: 'BMW I8',
  })
  @IsOptional()
  @IsString()
  productName: string;

  @ApiPropertyOptional({
    enum: BrandsEnum,
  })
  @IsEnum(BrandsEnum)
  @IsOptional()
  brand: BrandsEnum;
}
