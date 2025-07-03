import pool from './db.js';

export default class BaseService {
  constructor(tableName) {
    this.table = tableName;
  }

  async getAll() {
    const result = await pool.query(`SELECT * FROM ${this.table}`);
    return result.rows;
  }

  async getById(id) {
    const result = await pool.query(`SELECT * FROM ${this.table} WHERE id = $1`, [id]);
    return result.rows[0];
  }

  async create(data, columns) {
    const values = columns.map(col => data[col]);
    const placeholders = columns.map((_, i) => `$${i + 1}`).join(', ');
    const result = await pool.query(
      `INSERT INTO ${this.table}(${columns.join(', ')}) VALUES (${placeholders}) RETURNING *`,
      values
    );
    return result.rows[0];
  }

  async delete(id) {
    await pool.query(`DELETE FROM ${this.table} WHERE id = $1`, [id]);
    return { message: 'Deleted successfully' };
  }
}