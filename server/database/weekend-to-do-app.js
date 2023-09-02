// The pg library makes it easy to connect to a database
// and send SQL statements
const pg = require('pg');

// A pool is a connection to the database
// We send SQL to the database using `pool.query()`
const pool = new pg.Pool({
    // The name of your database.  This will change for every app!
    database: 'weekend-to-do-app',
    // Where is your database?  localhost == on your computer!
    host: 'localhost',
    // Postgres listens for network connections on port 5432, by default!
    port: 5432
});

module.exports = pool;