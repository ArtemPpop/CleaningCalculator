import { pool } from '../db.js';

export const getAllClients = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM clients');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createClient = async (req, res) => {
  const { company_name, contact_name, phone, email } = req.body;
  try {
    await pool.query(
      'INSERT INTO clients(company_name, contact_name, phone, email) VALUES ($1, $2, $3, $4)',
      [company_name, contact_name, phone, email]
    );
    res.status(201).json({ message: 'Клиент добавлен' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};