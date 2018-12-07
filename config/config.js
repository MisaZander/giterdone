require("dotenv").config();

console.log("Logging: " + process.env.DB_LOGGING);
console.log("Force: " + process.env.DB_FORCE);

module.exports = {
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
  production: {
    useEnvVariable: process.env.JAWSDB_URL,
    dialect: "mysql"
  }
};
