const express = require('express');
const db = require('../event_db');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT id, name FROM categories ORDER BY name ASC');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'The labels could not be loaded.' });
  }
});

module.exports = router;
