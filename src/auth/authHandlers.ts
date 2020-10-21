import * as jwt from "jsonwebtoken";

import { AuthenticationError } from "apollo-server-express";

const generateJWT = (
  user: object,
  jwtSecret: string,
  expiresIn: object
): string => {
  return jwt.sign(user, jwtSecret, expiresIn);
};

export const tokenGenerator = (req, res) => {
  const { user } = req;

  const { password, ...rest } = user[0] as any;

  console.log("password", password);

  let expiresIn = 86400;

  const jwtToken = generateJWT(rest, process.env.jwtSecret, { expiresIn });

  console.log("jwtToken", jwtToken);
  res.status(200).json({ auth: true, token: jwtToken, user: rest.email });
};

export const verifyToken = async ({ req, ...rest }) => {
  const { authorization } = req.headers;

  if (authorization !== undefined) {
    const token = /Bearer\s(.+)/.exec(authorization)[1];

    jwt.verify(token, process.env.jwtSecret, (err, decodedToken) => {
      if (err) {
        throw new AuthenticationError("Must authenticate");
      } else {
        console.log("decodedToken", decodedToken);

        return { authorized: true, user: decodedToken, ...rest };
      }
    });
  }
};

export const validateData = (data: {
  email?: string;
  username?: string;
  password?: string;
}) => {
  let errors: any = {};

  if (isEmpty(data.email)) {
    errors.email = "Must not be empty";
  } else if (!isEmail(data.email)) {
    errors.email = "Must be a valid email";
  }

  if (isEmpty(data.username)) errors.username = "Must not be empty";
  if (isEmpty(data.password)) errors.password = "Must not be empty";

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};

const isEmpty = (string: string) => {
  if (string.trim() === "") return true;
  else return false;
};
const isEmail = (email: string) => {
  const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.match(regEx)) return true;
  else return false;
};
