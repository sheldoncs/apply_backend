import knex from "../../../config/knex";

export const LoginQueries = {
  getAllLoginRecords: async () => {
    const users = await knex("logins").select("*");
    return users;
  },

  getLoginRecordById: async (loginId: number) => {
    const login = await knex
      .select("*")
      .from("logins AS login")
      .where("login.loginId", "=", loginId);
    return login;
  },

  geLoginByUsername: async (username: string) => {
    const login = await knex("logins").where({ username }).first();
    return login;
  },

  addLogin: async (login: object) => {
    return await knex("logins").insert(login).returning("*");
  },

  deleteLoginById: async (loginId: number) => {
    return await knex("users").where({ loginId }).del().returning("*");
  },

  deleteLoginByUsername: async (username: string) => {
    return await knex("logins").where({ username }).del().returning("*");
  },

  updateUserById: async (payload: object) => {
    const { loginId, ...rest } = payload as any;
    return await knex("logins")
      .where({ loginId })
      .update({ ...rest, updatedAt: knex.fn.now() }, ["*"]);
  },

  updateUserByUsername: async (payload: object) => {
    const { username, ...rest } = payload as any;
    return await knex("logins")
      .where({ username })
      .update({ ...rest, updatedAt: knex.fn.now() }, ["*"]);
  },

  updateUserLastLoginByUsername: async (username: string, lastLogin: Date) => {
    let date = knex.fn.now();
    return await knex("logins")
      .where({ username })
      .update({ lastLogin: date }, ["*"]);
  },
};
