export const getEquipment = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM equipment');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch equipment' });
  }
};

export const createEquipment = async (req, res) => {
  const { object_id, name, model, condition, quantity, area, frequency, category } = req.body;
  try {
    await pool.query(
      'INSERT INTO equipment(object_id, name, model, condition, quantity, area, frequency, category) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)',
      [object_id, name, model, condition, quantity, area, frequency, category]
    );
    res.json({ message: 'Equipment created' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create equipment' });
  }
};