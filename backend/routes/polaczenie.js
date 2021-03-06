//env for test
var path = require('path');
var dotEnvPath = path.resolve('./.env');
require('dotenv').config({ path: dotEnvPath});
///
const Pool = require('pg').Pool
const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_USER_PASS,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
})

module.exports = pool;