// import { Queries } from "../../../endpoints/queries";
import { Queries } from "../../../endPoints/queries";
import { LoginInterface } from "../../../interfaces/queryInterfaces";

export const logins = async () => {
  const AllLogins = await Queries.LoginQueries.getAllUserLogins();
  return AllLogins;
};
export const login = async (root: any, args: { id: number }) => {
  const singleLoginById = await Queries.LoginQueries.getLoginById(args.id);
  return singleLoginById;
};
export const getLoginByUsername = async (
  root: any,
  args: { username: string }
) => {
  const singleLoginByUsername = await Queries.LoginQueries.singleLoginByUsername(
    args.username
  );
  return singleLoginByUsername;
};

export const authorizeUser = async (
  root: any,
  args: { username: string; password: string }
) => {
  const authorize = await Queries.LoginQueries.confirmUserCredentials(
    args.username,
    args.password
  );
  return authorize;
};
export const getLoginByEmail = async (root: any, args: { email: string }) => {
  const loginByEmail = await Queries.LoginQueries.getLoginByEmail(args.email);
  return loginByEmail;
};
export const singleLoginByUsername = async (
  root: any,
  args: { username: string }
) => {
  const loginByUsername = await Queries.LoginQueries.singleLoginByUsername(
    args.username
  );
  return loginByUsername;
};
export const addLoginInfo = async (root: any, payload: LoginInterface) => {
  const findProfile = await Queries.LoginQueries.getLoginByEmail(payload.email);
  if (!findProfile) {
    await Queries.LoginQueries.addUser([
      {
        ...payload,
      },
    ]);

    const Login = {
      ...payload,
    };

    const message = `User, ${payload.email} created successfully`;
    return { message, Login };
  } else {
    const message = `User already exists`;
    return { message };
  }
};
export const updatePhotoByUsername = async (
  root: any,
  args: { username: string; base64string: string }
) => {
  let loginInfo = Queries.LoginQueries.singleLoginByUsername(args.username);
  if (loginInfo) {
    await Queries.LoginQueries.updatePhotoByUsername(
      args.username,
      args.base64string
    );
    const message = `User, ${args.username} updated successfully`;
    return { message, loginInfo };
  } else {
    const message = `User, ${args.username} does not exists`;
    return { message };
  }
};
export const updateLastLoginByEmail = async (
  root: any,
  args: { email: string }
) => {
  let userInfo = Queries.LoginQueries.getLoginByEmail(args.email);

  if (userInfo) {
    await Queries.LoginQueries.updateUserLastLoginByEmail(args.email);

    const message = `User, ${args.email} created successfully`;
    return { message, userInfo };
  } else {
    const message = `User, ${args.email} does not exists`;
    return { message };
  }
};
export const updateUserById = async (
  root: any,
  args: { id: number; payload: LoginInterface }
) => {
  let userInfo = Queries.LoginQueries.getUserById(args.id);

  if (userInfo) {
    await Queries.LoginQueries.updateUserbyId(args.id, args.payload);

    const message = `User, ${args.payload} created successfully`;
    return { message, userInfo };
  } else {
    const message = `User, ${args.id} does not exists`;
    return { message };
  }
};
export const deleteByUsername = async (
  root: any,
  args: { username: string }
) => {
  const findProfile = await Queries.LoginQueries.singleLoginByUsername(
    args.username
  );
  if (!findProfile) {
    const message = `User not found`;
    return { message };
  } else {
    const del = await Queries.LoginQueries.deleteLoginByEmail(args.username);
    const message = `User, ${del[0]["email"]} deleted successfully`;
    return { message };
  }
};
export const deleteLoginById = async (root: any, args: { id: number }) => {
  const findProfile = await Queries.LoginQueries.getLoginById(args.id);
  if (!findProfile) {
    const message = `User not found`;
    return { message };
  } else {
    const del = await Queries.LoginQueries.deleteLoginById(args.id);
    const message = `User, ${del[0]["email"]} deleted successfully`;
    return { message };
  }
};
