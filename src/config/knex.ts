import knex from "knex";

import config from "../../knexfile";

const env = process.env.NODE_ENV || "development";

const environmentConfig = config[env];

const connection = knex(environmentConfig);

export default connection;
