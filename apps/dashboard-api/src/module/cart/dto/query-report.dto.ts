import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class QueryReportDto {
  @ApiProperty({
    example: new Date(),
  })
  @IsString()
  @IsNotEmpty()
  startDate: string;

  @ApiProperty({
    example: new Date(),
  })
  @IsString()
  @IsNotEmpty()
  endDate: string;
}
