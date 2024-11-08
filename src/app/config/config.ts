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
  SMTP_PASS: process.env.SMTP_PASS,
  SMTP_MAIL: process.env.SMTP_MAIL,
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PORT: process.env.SMTP_PORT,
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  SUPER_ADMIN_PASSWORD: process.env.SUPER_ADMIN_PASSWORD,
};

// Better solution with type safe found in ./index.ts used envalid => https://www.npmjs.com/package/envalid?activeTab=readme
