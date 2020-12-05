const config = {
  SITE_URL: process.env.SITE_URL || "http://localhost:3000",
  SERVER_PORT: process.env.SERVER_PORT || 8000,
  ORIGIN: process.env.ORIGIN || "*",
  SYSTEM_DB: process.env.DB_NAME || "inetmedia",
  DB_PORT: process.env.DB_PORT || 5432,
  DB_HOST: process.env.DB_HOST || "localhost",
  DB_USER: process.env.DB_USER || "postgres",
  DB_DRIVER: process.env.DB_DRIVER || "postgres",
  DB_PASSWORD: process.env.DB_PASSWORD || "dira123",
  JWT_KEY: process.env.JWT_KEY || "1q@w3e4r5t6y",
  JWT_TIME: process.env.JWT_TIME || "24h",
};

export default config;
