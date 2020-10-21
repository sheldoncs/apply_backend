import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  knex.schema
    .hasTable("login")
    .then((exists) => {
      if (!exists) {
        return knex.schema.createTable("login", function (table) {
          table.increments("id").primary();
          table.string("username", 100).notNullable();
          table.string("password", 100).notNullable();
          table.string("email", 255).notNullable();
          table
            .timestamp("created_at", { useTz: true })
            .notNullable()
            .defaultTo(knex.fn.now());
          table
            .timestamp("updated_at", { useTz: true })
            .notNullable()
            .defaultTo(knex.fn.now());
        });
      }
    })
    .catch((err) => "unable to create table");
}
export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("login");
}
