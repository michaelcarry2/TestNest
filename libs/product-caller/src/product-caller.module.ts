import { Module } from '@nestjs/common';
import { ProductCallerService } from './product-caller.service';
import { makeRMQClient } from '@Libs/microservice';
import { ProductServeiceRMQ } from './constant';

@Module({
  providers: [makeRMQClient(ProductServeiceRMQ), ProductCallerService],
  exports: [makeRMQClient(ProductServeiceRMQ), ProductCallerService],
})
export class ProductCallerModule {}
