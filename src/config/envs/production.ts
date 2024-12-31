export const config = {
  db: {
    synchronize: false,
    logging: false,
    host: process.env['DB_HOST'],
    port: process.env['DB_PORT'],
    username: process.env['DB_USER'],
    password: process.env['DB_PASSWORD'],
    database: process.env['DB_NAME'],
    autoLoadEntities: true,
  },
  jwt: {
    accessSecret: process.env['JWT_ACCESS_SECRET'],
    refreshSecret: process.env['JWT_REFRESH_SECRET'],
  },
};
