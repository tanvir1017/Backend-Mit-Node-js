import dotenv from "dotenv";
import path from "path";

// Declaring path for specific .env files
dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  ATLAS_URI: process.env.DATABASE_URL,
  BCRYPT_SALT: process.env.BCRYPT_SALT_ROUNDS,
  DEFAULT_PASS: process.env.DEFAULT_PASS,
  JWT_ACCESS_TOKEN: process.env.JWT_ACCESS_TOKEN,
  JWT_REFRESH_TOKEN: process.env.JWT_REFRESH_TOKEN,
  JWT_ACCESS_EXPIRES_IN: process.env.JWT_ACCESS_EXPIRES_IN,
  JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN,
  FRONTEND_DEV_ENV: process.env.FRONTEND_DEV_ENV,
  FRONTEND_PRO_ENV: process.env.FRONTEND_PRO_ENV,
};
