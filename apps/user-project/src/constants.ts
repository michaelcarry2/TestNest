import { User, usersSchema } from './modules/user/schemas/users.schema';

export const USER_PROJECT = 'user-project';

export const userServiceModel = [
  {
    name: User.name,
    schema: usersSchema,
  },
];

export const connectionName = 'user';
