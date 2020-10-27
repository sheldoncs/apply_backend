import passport from "passport";
import bcrypt from "bcrypt";
import { LoginQueries } from "../endPoints/login/queries";
import { validateData } from "./authHandlers";
import LocalStrategy from "passport-local";

export const localPassport = passport.use(
  new LocalStrategy.Strategy(
    {
      usernameField: "username",
      passwordField: "password",
    },
    async (
      username: string,
      password: string,
      done: (arg0: any, arg1: boolean | any[]) => any
    ) => {
      try {
        const userInfo = await LoginQueries.singleLoginByUsername(username);

        if (!userInfo) {
          return done(null, false);
        }

        let validatePassword = await bcrypt.compare(
          password,
          userInfo.password
        );
        if (password === userInfo.password) {
          validatePassword = true;
        }
        if (!validatePassword) {
          return done(null, false);
        }
        const user = [userInfo];

        return done(null, user);
      } catch (error) {
        console.log(error);
        throw new Error("Internal Server Error");
      }
    }
  )
);

export const Signup = async (
  req: { body: { email: string; username: string; password: string } },
  res: any,
  next: any
) => {
  const newUser = {
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
  };
  //valid user inputs
  const validate = validateData(newUser);
  if (!validate.valid) return res.json(validate.errors);

  try {
    //check if user exists
    const currentUser: any = await LoginQueries.getLoginByEmail(newUser.email);
    if (currentUser) {
      
      return res.status(400).json({ message: "User already exists" });
    }
    //hash pass
    const hashedPassword = await bcrypt.hash(newUser.password, 12);
    let date = new Date();
    const user = {
      email: newUser.email,
      username: newUser.username,
      password: hashedPassword,
      lastLogin: date,
      provider: "local",
    };

    //add new user to db
    const persistNewUser = await LoginQueries.addUser(user);
    console.log(persistNewUser);

    //TODO: Add data in response?
    return res.status(200).json({ message: "User successfully created" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Something went wrong please try again" + error });
  }
};
