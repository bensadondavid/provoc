const { Pool } = require('pg')
const dotenv = require('dotenv').config()


const pool = new Pool({
    connectionString : process.env.DATABASE_URL,
    ssl : {
        rejectUnauthorized : false
    },
    max : 15
})

pool.on('error', (err) => {
  console.error('💥  Erreur sur le pool PostgreSQL :', err.code);
});

module.exports = pool
