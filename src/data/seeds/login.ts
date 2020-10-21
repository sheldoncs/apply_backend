import * as Knex from "knex";
import login from "../../seedData/login";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("login").del();

  // Inserts seed entries
  await knex("login").insert(login);
}
