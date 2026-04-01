const pool = require("../config/db");

const createTables = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        email VARCHAR(40) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        gender VARCHAR(7) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
  } catch (err) {
    console.error("Error creating tables:", err);
  }
};
createTables();
