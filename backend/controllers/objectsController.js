import { pool } from '../db.js';

export const getObjectsByClient = async (req, res) => {
  const { clientId } = req.params;
  const result = await pool.query('SELECT * FROM objects WHERE client_id = $1', [clientId]);
  res.json(result.rows);
};

export const createObject = async (req, res) => {
  const { client_id, name, address, type, work_schedule, start_date, contract_duration } = req.body;
  const result = await pool.query(
    `INSERT INTO objects (client_id, name, address, type, work_schedule, start_date, contract_duration)
     VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
    [client_id, name, address, type, work_schedule, start_date, contract_duration]
  );
  res.status(201).json(result.rows[0]);
};