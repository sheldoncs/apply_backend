import {
  logins,
  singleLoginByUsername,
  getLoginByEmail,
  authorizeUser,
  updateLastLoginByEmail,
  login,
  addLoginInfo,
  deleteByUsername,
  deleteLoginById,
} from "./resolvers/login/login";

export const resolvers = {
  Query: {
    logins,
    getLoginByEmail,
    authorizeUser,
    singleLoginByUsername,
    login,
  },

  Mutation: {
    addLoginInfo,
    deleteByUsername,
    deleteLoginById,
    updateLastLoginByEmail,
  },
};
