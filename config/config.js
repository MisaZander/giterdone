//Replacement for a config.json file that utilizes .env variables
require("dotenv").config();

module.exports = {
  demo: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: "mysql",
    sync: {
      force: process.env.DB_FORCE === "true" ? true : false
    }
  },
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: "mysql",
    sync: {
      force: process.env.DB_FORCE === "true" ? true : false
    }
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false,
    sync: {
      force: process.env.DB_FORCE === "true" ? true : false
    },
    dialectOptions: {
      socketPath: "/var/run/mysqld/mysqld.sock"
    }
  },
  staging: {
    remoteDB: process.env.JAWSDB_URL,
    dialect: "mysql",
    sync: {
      force: true
    }
  },
  production: {
    remoteDB: process.env.JAWSDB_URL,
    dialect: "mysql"
  }
};
