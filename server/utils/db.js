const sql = require("mssql");

const connectionOptions = {
  server: process.env.SQL_SERVER,
  database: process.env.SQL_DATABASE,
  user: process.env.SQL_UID,
  password: process.env.SQL_PWD,
  port: 1443,
  options: {
    encrypt: false,
    enableArithAbort: false,
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
};

const pool = new sql.ConnectionPool(connectionOptions);

module.exports = pool;
