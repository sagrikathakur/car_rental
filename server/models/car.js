import { pool } from '../config/db.js';

export const create = async (carData) => {
  const { owner_id, brand, model, year, color, price, image, category, fuel_type, transmission, seats, description, price_per_day } = carData;
  const result = await pool.query(
    `INSERT INTO cars 
    (owner_id, brand, model, year, color, price, image, category, fuel_type, transmission, seats, description, price_per_day) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) 
    RETURNING *`,
    [owner_id, brand, model, year, color, price, image, category, fuel_type, transmission, seats, description, price_per_day]
  );
  return result.rows[0];
};

export const findByOwner = async (owner_id) => {
  const result = await pool.query('SELECT * FROM cars WHERE owner_id = $1', [owner_id]);
  return result.rows;
};

export const findAll = async () => {
  const result = await pool.query('SELECT * FROM cars ORDER BY created_at DESC');
  return result.rows;
};
