import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const { Pool } = pkg;

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

// PostgreSQL pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// POST /calculate — расчёт стоимости на стороне клиента, но оставим для полноты
app.post('/calculate', (req, res) => {
  const { area, types, extras } = req.body;

  const prices = {
    main: 25,
    support: 10,
    mechanical: 15,
    manual: 20,
    carpet: 50,
    garbage: 3000,
    antiIce: 5000,
  };

  let total = 0;
  if (types.main) total += area * prices.main;
  if (types.support) total += area * prices.support;
  if (types.mechanical) total += area * prices.mechanical;
  if (types.manual) total += area * prices.manual;
  if (extras.carpet) total += area * prices.carpet * 0.1;
  if (extras.garbage) total += prices.garbage;
  if (extras.antiIce) total += prices.antiIce;

  res.json({ total });
});

// POST /submit — сохранить расчёт в БД
app.post('/submit', async (req, res) => {
  const { area, types, extras, total, contact } = req.body;

  try {
    await pool.query(
      'INSERT INTO submissions(area, types, extras, total, contact, created_at) VALUES ($1, $2, $3, $4, $5, NOW())',
      [area, types, extras, total, contact]
    );
    res.json({ message: 'Заявка успешно сохранена' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка при сохранении в базу' });
  }
});

// GET /submissions — получить все заявки
app.get('/submissions', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM submissions ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка при получении заявок' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});