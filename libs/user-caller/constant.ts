export const UserServiceRMQ = {
  name: 'RMQ_USER_SERVICE',
  service: 'user-project',
};

export const UserCommands = {
  createUser: {
    cmd: 'user',
    method: 'create',
  },
  getUserByUsername: {
    cmd: 'user',
    method: 'getUserByUsername',
  },
  updateUser: {
    cmd: 'user',
    method: 'updateUser',
  },
};

export const AuthCommands = {
  login: {
    cmd: 'auth',
    method: 'login',
  },
};
