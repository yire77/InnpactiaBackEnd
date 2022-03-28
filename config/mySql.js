// get the client
const mysql = require('mysql');

// Create the connection pool. The pool-specific settings are the defaults
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'DB_INNPACTIA',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

pool.getConnection(function(err,connection){

    if (err) {
        console.log(err)
        console.log('error en conectar')
        
    } else {
        console.log('Base conectada')
        
    }
})

module.exports = pool;

