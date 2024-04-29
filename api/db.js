
const Pool = require("pg").Pool;

const pool = new Pool(
    {
        "user": "postgres",
        "password": "2401",
        "host": "localhost",
        "port": 5432,
        "database": "мeasures_for_the_protection_of_ships"
    }
);

module.exports = pool;