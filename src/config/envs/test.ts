export const config = {
  db: {
    synchronize: true,
    logging: false,
    host: process.env['TEST_DB_HOST'],
    port: process.env['TEST_DB_PORT'],
    username: process.env['TEST_DB_USER'],
    password: process.env['TEST_DB_PASSWORD'],
    database: process.env['TEST_DB_NAME'],
    keepConnectionAlive: true,
    connectTimeout: 15000,
    extra: { connectionLimit: 5 },
    autoLoadEntities: true,
  },
  jwt: {
    accessSecret: process.env['DEV_JWT_ACCESS_SECRET'] || 'dev-jwt-access-secret',
    refreshSecret: process.env['DEV_JWT_REFRESH_SECRET'] || 'dev-jwt-refresh-secret',
  },
};
