import { pool } from '../config/db.js';

export const findByEmail = async (email) => {
  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0];
};

export const findById = async (id) => {
  const result = await pool.query('SELECT id, name, email, role, image FROM users WHERE id = $1', [id]);
  return result.rows[0];
};

export const create = async ({ name, email, password, role, image }) => {
  const result = await pool.query(
    'INSERT INTO users (name, email, password, role, image) VALUES ($1, $2, $3, $4, $5) RETURNING id',
    [name, email, password, role || 'user', image]
  );
  return result.rows[0];
};

export const updateRole = async (id, role) => {
  const result = await pool.query(
    'UPDATE users SET role = $1 WHERE id = $2 RETURNING id, name, email, role, image',
    [role, id]
  );
  return result.rows[0];
};

export const updateProfile = async (id, { name, image }) => {
  const result = await pool.query(
    'UPDATE users SET name = $1, image = $2 WHERE id = $3 RETURNING id, name, email, role, image',
    [name, image, id]
  );
  return result.rows[0];
};
