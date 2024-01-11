const sql = require('mssql');

const connectionOptions = {
    driver: process.env.SQL_DRIVER,
    server: process.env.SQL_SERVER,
    database: process.env.SQL_DATABASE,
    user: process.env.SQL_UID,
    password: process.env.SQL_PWD,
    options: {
        encrypt: false,
        enableArithAbort: false,
    }
}

const pool = new sql.ConnectionPool(connectionOptions);

module.exports = pool;
