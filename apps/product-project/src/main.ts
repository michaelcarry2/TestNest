import { NestFactory } from '@nestjs/core';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

import { Logger } from '@nestjs/common';
import { getQueueName, makeRMQService } from '@Libs/microservice';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions } from '@nestjs/microservices';
import { PRODUCT_PROJECT } from './constant';
import { AppModule } from './modules/app/app.module';

dayjs.extend(utc);
dayjs.extend(timezone);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger();
  const configService = app.get<ConfigService>(ConfigService);
  const port = configService.get<number>('port');
  const provider = configService.get<string>('provider');

  const queueName = getQueueName(PRODUCT_PROJECT);
  app.connectMicroservice<MicroserviceOptions>(makeRMQService(PRODUCT_PROJECT));

  await app.startAllMicroservices();
  await app.listen(port, () => {
    logger.log(`
      Application ${provider} started listen on port ${port}
      Queue Microservice: ${queueName}
      Local Timezone guess: ${dayjs.tz.guess()}
      Local Date: ${dayjs().toDate().toISOString()} ~ ${dayjs().format(
        'YYYY-MM-DD HH:mm:ss',
      )}
    `);
  });
}
bootstrap();
