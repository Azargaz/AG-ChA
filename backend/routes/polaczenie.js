const Pool = require('pg').Pool
const pool = new Pool({
    user: 'Franek',
    password: 'Molesta1',
    host: 'localhost',
    port: 5432,
    database: 'projekt_io'
})

module.exports = pool;