import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  knex.schema
    .hasTable("apply")
    .then((exists) => {
      if (!exists) {
        return knex.schema.createTable("apply", function (table) {
          table.increments("id").primary();
          table.string("fistname", 100).notNullable();
          table.string("lastname", 100).notNullable();
          table.string("educationType", 100).notNullable();
          table.integer("educationId", 100).notNullable();
          table.integer("graduationYearId", 12).notNullable();
          table.integer("interestId", 150).notNullable();
          table.string("careerGoals", 255).notNullable();
          table.string("currentOccupation", 255).notNullable();
          table.integer("internshipRoleId", 10).notNullable();
          table.integer("internshipDuration", 10).notNullable();
          table.string("mobileNumber", 255).notNullable();
          table.string("homeNumber", 255).notNullable();
          table.string("countryCode", 5).notNullable();
          table.string("username", 255).notNullable();
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
  return knex.schema.dropTable("apply");
}
