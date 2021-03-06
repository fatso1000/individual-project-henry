export const CORS_URL = process.env.CORS_URL || "*";
export const PORT = process.env.PORT || 8080;
export const DB = {
  DB_USER: process.env.DB_USER!,
  DB_PWD: process.env.DB_PASSWORD,
  DB_URL: process.env.DATABASE_URL,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: parseInt(process.env.DB_PORT!),
  DB_NAME: process.env.DB_NAME!,
};
export const API_KEY = process.env.API_KEY;
