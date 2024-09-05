export enum BrandsEnum {
  BMW = 'bmw',
  BENZ = 'benz',
  FORD = 'ford',
  TOYOTA = 'toyota',
  HONDA = 'honda',
}

export interface IProduct {
  productId?: string;
  productName: string;
  price: number;
  amount: number;
  brand: BrandsEnum;
  createdAt?: Date;
  updatedAt?: Date;
}

export type IProductOption = Partial<IProduct>;
