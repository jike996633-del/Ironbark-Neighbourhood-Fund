const express = require('express');
const db = require('../event_db');

const router = express.Router();

const SELECT_NIGHT = `
  SELECT
    e.id,
    e.name,
    e.short_description,
    e.full_description,
    e.purpose,
    e.event_date,
    e.location,
    e.ticket_price,
    e.goal_amount,
    e.current_amount,
    e.is_suspended,
    c.name AS category_name,
    o.name AS organisation_name,
    o.description AS organisation_description,
    o.contact_email,
    o.contact_phone,
    o.address,
    CASE
      WHEN e.event_date < CURDATE() THEN 'Past'
      ELSE 'Upcoming'
    END AS timing
  FROM events e
  JOIN categories c ON c.id = e.category_id
  JOIN organisations o ON o.id = e.organisation_id
`;

router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query(`
      ${SELECT_NIGHT}
      WHERE e.is_suspended = 0
        AND e.event_date >= CURDATE()
      ORDER BY e.event_date ASC
    `);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'The timetable could not be loaded.' });
  }
});

router.get('/filter', async (req, res) => {
  const date = typeof req.query.date === 'string' ? req.query.date.trim() : '';
  const location = typeof req.query.location === 'string' ? req.query.location.trim() : '';
  const category = typeof req.query.category === 'string' ? req.query.category.trim() : '';

  const clauses = ['e.is_suspended = 0'];
  const values = [];

  if (date) {
    clauses.push('DATE(e.event_date) = ?');
    values.push(date);
  }
  if (location) {
    clauses.push('e.location LIKE ?');
    values.push(`%${location}%`);
  }
  if (category) {
    clauses.push('c.name = ?');
    values.push(category);
  }

  try {
    const [rows] = await db.query(
      `
        ${SELECT_NIGHT}
        WHERE ${clauses.join(' AND ')}
        ORDER BY e.event_date ASC
      `,
      values
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'The filter request failed.' });
  }
});

router.get('/:id', async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id < 1) {
    res.status(400).json({ error: 'The night id is not valid.' });
    return;
  }

  try {
    const [rows] = await db.query(
      `
        ${SELECT_NIGHT}
        WHERE e.id = ?
          AND e.is_suspended = 0
        LIMIT 1
      `,
      [id]
    );
    if (!rows.length) {
      res.status(404).json({ error: 'That night is not available.' });
      return;
    }
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'The night could not be loaded.' });
  }
});

module.exports = router;
