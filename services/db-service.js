const mysql = require("mysql");
const params = require("../env/params");

var apiCounter = 0;

const _mySqlService = mysql.createPool({
    connectionLimit: 15,
    host: params.DB_HOST,
    user: params.DB_USER,
    password: params.DB_PASSWORD,
    database: params.DB_DATABASE,
    port: params.DB_PORT
});

module.exports = {
    _mySqlService, apiCounter
};