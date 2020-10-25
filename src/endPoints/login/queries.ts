import knex from "../../config/knex";

export const LoginQueries = {
  getAllUserLogins: async () => {
    const logins = await knex("logins");
    return logins;
  },

  addUser: async (login: object) => {
    return await knex("logins").insert(login).returning("*");
  },
  // getUserProfileById: async (id: number) => {
  //   const userProfile = await knex('userProfile').where({ id }).first();
  //   return userProfile;
  // },
  singleLoginByUsername: async (username: string) => {
    const logins = await knex("logins").where({ username }).first();
    return logins;
  },
  getLoginById: async (id: number) => {
    const logins = await knex("logins").where({ id }).first();
    return logins;
  },
  getLoginByEmail: async (email: string) => {
    const logins = await knex("logins").where({ email }).first();
    return logins;
  },
  confirmUserCredentials: async (username: string, password) => {
    const logins = await knex("logins").where({ username, password }).first();
    return logins;
  },
  getUserById: async (id: number) => {
    const logins = await knex("logins").where(id).first();
    return logins;
  },

  deleteLoginById: async (id) => {
    return await knex("logins").where({ id }).del().returning("*");
  },

  deleteLoginByEmail: async (email) => {
    return await knex("logins").where({ email }).del().returning("*");
  },
  updateUserbyId: async (id, login) => {
    return await knex("logins").where({ id }).update(login).returning("*");
  },
  updatePhotoByUsername: async (username: String, base64Photo: String) => {
    return await knex("logins")
      .where({ username })
      .update({ imgblob: base64Photo }, ["*"]);
  },
  updateUserLastLoginByEmail: async (email: String) => {
    let date = knex.fn.now();
    return await knex("logins")
      .where({ email })
      .update({ lastLogin: date }, ["*"]);
  },
};
