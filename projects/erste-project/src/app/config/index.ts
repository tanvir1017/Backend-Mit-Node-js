import dotenv from "dotenv";
import path from "path";

// Declaring path for specific .env files
dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  PORT: process.env.PORT,
  ATLAS_URI: process.env.DATABASE_URL,
  BCRYPT_SALT: process.env.BCRYPT_SALT_ROUNDS,
};
