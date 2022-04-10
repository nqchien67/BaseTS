export default {
  SERVER: {
    API_URL: process.env.API_URL,
    NODE_ENV: process.env.ENVIRONMENT,
    PORT: Number(process.env.PORT),
  },
  MONGO: {
    URI: process.env.MONGO_URI,
  },
  AUTH: {
    ACCESS_TOKEN_SECRET: process.env.AUTH_ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET: process.env.AUTH_REFRESH_TOKEN_SECRET,
    ADMIN_TOKEN: process.env.ADMIN_TOKEN,
    SALT_ROUND: Number(process.env.SALT_ROUND),
    TOKEN_TTL: process.env.TOKEN_TTL,
    REFRES_TOKEN_TTL: process.env.REFRES_TOKEN_TTL,
    FORGOT_PASSWORD_LINK_TTL: Number(process.env.FORGOT_PASSWORD_LINK_TTL),
  },
  /** Mysql database information */
  database: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    db: process.env.DB_NAME,
  },
};
