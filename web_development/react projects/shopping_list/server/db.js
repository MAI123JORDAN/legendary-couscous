const mysql = require('mysql2');

// connection pool
const pool = mysql.createPool ({
    host: 'localhost',
    user: 'mai',
    password: 'supriya',
    database: 'shopping_card',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Export the promised-based version so we can use async/wait
module.exports = pool.promise();