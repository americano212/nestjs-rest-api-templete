export const config = {
  db: {
    synchronize: true,
    logging: true,
    host: process.env['DEV_DB_HOST'],
    port: process.env['DEV_DB_PORT'],
    username: process.env['DEV_DB_USER'],
    password: process.env['DEV_DB_PASSWORD'],
    database: process.env['DEV_DB_NAME'],
    autoLoadEntities: true,
  },
  jwt: {
    accessSecret: process.env['DEV_JWT_ACCESS_SECRET'] || 'dev-jwt-access-secret',
    refreshSecret: process.env['DEV_JWT_REFRESH_SECRET'] || 'dev-jwt-refresh-secret',
  },
};
