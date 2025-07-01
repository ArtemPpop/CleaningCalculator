import pool from '../db.js';

export const calculateProposal = async (req, res) => {
  try {
    const { object_id } = req.body;

    // 1. Получаем все нужные данные
    const [zones, personnel, materials, equipment, costItems] = await Promise.all([
      pool.query('SELECT * FROM internal_zones WHERE object_id = $1', [object_id]),
      pool.query('SELECT * FROM personnel WHERE object_id = $1', [object_id]),
      pool.query('SELECT * FROM materials WHERE object_id = $1', [object_id]),
      pool.query('SELECT * FROM equipment WHERE object_id = $1', [object_id]),
      pool.query('SELECT * FROM cost_items WHERE object_id = $1', [object_id]),
    ]);

    // 2. Примитивная логика расчёта (можно доработать)
    let total = 0;

    zones.rows.forEach(zone => {
      if (zone.cleaning_main) total += zone.area * 20;
      if (zone.cleaning_support) total += zone.area * 10;
      if (zone.cleaning_manual) total += zone.area * 15;
      if (zone.cleaning_mechanical) total += zone.area * 18;
    });

    personnel.rows.forEach(p => {
      total += p.total_amount * 50000; // зарплата + налоги
    });

    materials.rows.forEach(m => {
      total += parseFloat(m.quantity) * 100; // условная цена
    });

    equipment.rows.forEach(e => {
      total += parseFloat(e.quantity) * 3000; // амортизация
    });

    costItems.rows.forEach(c => {
      total += parseFloat(c.monthly || 0);
    });

    const costWithoutVAT = total;
    const vat = costWithoutVAT * 0.2;
    const totalCost = costWithoutVAT + vat;

    res.json({ costWithoutVAT, vat, totalCost });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка при расчёте стоимости' });
  }
};