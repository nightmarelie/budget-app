export const configuration = () => ({
  port: parseInt(process.env.PORT),
  environment: process.env.NODE_ENV,
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
    type: process.env.DATABASE_TYPE,
  },
  jwt: {
    secret: process.env.JWT_TOKEN_SECRET,
    signOptions: { expiresIn: process.env.JWT_TOKEN_EXPIRES_IN },
  },
  security: {
    throttle: {
      ttl: parseInt(process.env.THROTTLE_TTL),
      limit: parseInt(process.env.THROTTLE_LIMIT),
    },
  },
});

export type Configuration = ReturnType<typeof configuration>;
export type DatabaseConfig = Configuration['database'];
export type JwtConfig = Configuration['jwt'];
export type ThrottleConfig = Configuration['security']['throttle'];
