const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  port: Number(process.env.PGPORT),
});

pool.on('connect', () => {
});

pool.on('error', (err: Error) => {
  console.error('PostgreSQL connection error:', err);
});

module.exports = { pool };
