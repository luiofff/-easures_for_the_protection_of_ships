
const Pool = require("pg").Pool;

const pool = new Pool(
    {
        "user": "postgres",
        "password": "2401",
        "host": "localhost",
        "port": 5432,
        "database": "sea_ships"
    }
);

module.exports = pool;