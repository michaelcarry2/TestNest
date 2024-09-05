import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ProductCallerService } from '@Libs/product-caller';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ICart } from '@Libs/product-caller/interfaces/cart.interface';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { QueryReportDto } from './dto/query-report.dto';

@Controller('reports')
@ApiTags('Reports')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class CartController {
  constructor(private readonly productCallerService: ProductCallerService) {}

  @Get()
  async reports(@Query() query: QueryReportDto): Promise<ICart[]> {
    return this.productCallerService.getReports(query);
  }
}
