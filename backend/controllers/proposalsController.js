import { pool } from '../db.js';

export const getProposals = async (_, res) => {
  const result = await pool.query(`
    SELECT p.*, c.company_name, o.name AS object_name
    FROM proposals p
    JOIN clients c ON c.id = p.client_id
    JOIN objects o ON o.id = p.object_id
    ORDER BY p.created_at DESC
  `);
  res.json(result.rows);
};

export const createProposal = async (req, res) => {
  const { client_id, object_id, total_cost, cost_without_vat, vat } = req.body;
  const result = await pool.query(
    `INSERT INTO proposals (client_id, object_id, total_cost, cost_without_vat, vat)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [client_id, object_id, total_cost, cost_without_vat, vat]
  );
  res.status(201).json(result.rows[0]);
};