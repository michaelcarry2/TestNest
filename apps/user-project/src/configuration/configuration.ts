export default (): any => ({
  provider: process.env.PROVIDER || 'user-project',
  port: parseInt(process.env.PORT, 10) || 3001,
  rmq: process.env.RMQ || 'localhost',
  redis: {
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: parseInt(process.env.REDIS_PORT, 10) || 6379,
  },
  database: {
    host: process.env.MONGODB_URI,
    options: {
      dbName: process.env.DB_NAME || 'user-project',
      w: 'majority',
    },
  },
  authentication: {
    secret: process.env.SECRET_KEY || 'super_secret',
    hashSize: 10,
    jwtOptions: {
      header: {
        typ: 'access',
      },
      audience: 'http://localhost',
      algorithm: 'HS256',
      expiresIn: '7d',
    },
  },
});
