import * as jwt from "jsonwebtoken";
import { AuthenticationError } from "apollo-server-express";

const generateJWT = (
  user: object,
  jwtSecret: string,
  expiresIn: object
): string => {
  return jwt.sign(user, jwtSecret, expiresIn);
};
