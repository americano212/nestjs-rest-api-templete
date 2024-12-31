export const config = {
  db: {
    type: process.env['DB_TYPE'],
    entities: ['dist/**/*.entity.{ts,js}'],
  },
  bcrypt: {
    salt: Number(process.env['BCRYPT_SALT']) || 10,
  },
  api: {
    port: process.env['PORT'],
  },
  jwt: {
    accessTokenExpire: process.env['ACCESS_TOKEN_EXPIRE'] || '1d',
    refreshTokenExpire: process.env['REFRESH_TOKEN_EXPIRE'] || '30d',
  },
  oauth: {
    kakao: {
      clientID: process.env['KAKAO_CLIENT_ID'],
      clientSecret: process.env['KAKAO_CLIENT_SECRET'],
      callbackURL: process.env['KAKAO_CALLBACK_URL'],
    },
    naver: {
      clientID: process.env['NAVER_CLIENT_ID'],
      clientSecret: process.env['NAVER_CLIENT_SECRET'],
      callbackURL: process.env['NAVER_CALLBACK_URL'],
    },
  },
  aws: {
    accessKey: process.env['AWS_ACCESS_KEY_ID'] || '',
    secretKey: process.env['AWS_SECRET_ACCESS_KEY'] || '',
    region: process.env['AWS_REGION'],
    s3: {
      bucketName: process.env['AWS_S3_BUCKET_NAME'] || '',
    },
  },
  slack: {
    webhookUrl: process.env['SLACK_WEBHOOK_URL'] || '',
  },
};
