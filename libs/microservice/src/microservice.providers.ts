import {
  ClientProxyFactory,
  MicroserviceOptions,
  Transport,
} from '@nestjs/microservices';

export const makeRMQService = (
  name: string,
  options: Record<string, any> = {},
): MicroserviceOptions => {
  const provider: { transport: any; options: Record<string, any> } = {
    transport: Transport.RMQ,
    options: {
      noAck: true,
      queue: getQueueName(name),
      urls: [process.env.RMQ],
      queueOptions: {
        durable: false,
      },
    },
  };
  if (options?.noAck) {
    provider.options.noAck = options.noAck;
  }
  if (options?.prefetchCount) {
    provider.options.prefetchCount = options.prefetchCount;
  }
  return provider;
};

export const getQueueName = (provider: string): string => {
  return `${provider}-${process.env.NODE_ENV}`;
};
export const makeRMQClient = (provider: { name: string; service: string }) => {
  return {
    provide: provider.name,
    useFactory: () =>
      ClientProxyFactory.create({
        transport: Transport.RMQ,
        options: {
          queue: getQueueName(provider.service),
          urls: [process.env.RMQ],
          queueOptions: {
            durable: false,
          },
        },
      }),
  };
};
