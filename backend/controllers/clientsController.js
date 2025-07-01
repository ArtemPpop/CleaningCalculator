import db from '../db/index.js';

export const getClients = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM clients');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка при получении клиентов' });
  }
};

export const createClient = async (req, res) => {
  const { name, contactPerson, phone, email } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO clients (name, contact_person, phone, email) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, contactPerson, phone, email]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка при создании клиента' });
  }
};