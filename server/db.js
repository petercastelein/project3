/*
CSCE 315
Project 3
Team 14
11/08/22
 */

// db.js
// database setup requirements

const Pool = require("pg").Pool;
const dotenv = require('dotenv').config();

const pool = new Pool({
   user: process.env.PSQL_USER,
   host: process.env.PSQL_HOST,
   database: process.env.PSQL_DATABASE,
   password: process.env.PSQL_PASSWORD,
   port: process.env.PSQL_PORT,
   ssl: {rejectUnauthorized: false}
});

module.exports = pool;