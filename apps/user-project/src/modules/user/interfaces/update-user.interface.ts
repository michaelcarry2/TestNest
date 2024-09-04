import { UserRoleEnum } from '../schemas/users.schema';

export interface IUpdateUser {
  username: string;
  roles?: UserRoleEnum[];
}
