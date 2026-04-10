import "dotenv/config";
import { pool } from './config/db.js';


const createTables = async () => {
  try {
    console.log('Connecting to Neon database...');
    
    // Create Users Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'user',
        image TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('Users table checked/created.');

    // Create Cars Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS cars (
        id SERIAL PRIMARY KEY,
        owner_id INT REFERENCES users(id),
        brand VARCHAR(255) NOT NULL,
        model VARCHAR(255) NOT NULL,
        year INT NOT NULL,
        color VARCHAR(50),
        price DECIMAL NOT NULL,
        image TEXT NOT NULL,
        category VARCHAR(100) NOT NULL,
        fuel_type VARCHAR(50) NOT NULL,
        transmission VARCHAR(50) NOT NULL,
        seats INT NOT NULL,
        description TEXT NOT NULL,
        price_per_day DECIMAL NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('Cars table checked/created.');

    console.log('Database setup completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error setting up database:', error.message);
    process.exit(1);
  }
};

createTables();
