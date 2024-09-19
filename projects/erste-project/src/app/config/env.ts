import { cleanEnv, num, str } from "envalid";

const env = cleanEnv(process.env, {
  PORT: num(),
  DATABASE_URL: str(),
});

export default env;
