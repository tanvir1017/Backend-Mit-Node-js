import jwt, { JwtPayload } from "jsonwebtoken";
export const createToken = (
  jwtPayload: JwtPayload,
  TOKEN: string,
  EXPIRES_IN: string,
) => {
  return jwt.sign(jwtPayload, TOKEN, {
    expiresIn: EXPIRES_IN,
  });
};
