export enum UserRoleEnum {
  USER = 'user',
  ADMIN = 'admin',
  SUPER_ADMIN = 'superAdmin',
}

export enum UserStatusEnum {
  ACTIVE = 'active',
  DISABLED = 'disabled',
}

export interface IUser {
  _id?: string;
  userId?: string;
  username: string;
  password: string;
  roles?: UserRoleEnum[];
  status?: UserStatusEnum;
  createdAt?: Date;
  updatedAt?: Date;
}
