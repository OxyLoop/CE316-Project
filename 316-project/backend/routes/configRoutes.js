const express = require('express');
const router = express.Router();
const db = require('../db'); // db.js dosyasından bağlantıyı alıyoruz

// ✅ 1. Yeni konfigürasyon ekle (POST)
router.post('/', (req, res) => {
  const { name, language, compileCommand, runCommand } = req.body;

  db.run(
    `INSERT INTO configurations (name, language, compileCommand, runCommand)
     VALUES (?, ?, ?, ?)`,
    [name, language, compileCommand, runCommand],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ id: this.lastID });
    }
  );
});

// ✅ 2. Tüm konfigürasyonları listele (GET)
router.get('/', (req, res) => {
  db.all(`SELECT * FROM configurations`, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// ✅ 3. Belirli bir konfigürasyonu sil (DELETE)
router.delete('/:id', (req, res) => {
  const configId = req.params.id;

  db.run(`DELETE FROM configurations WHERE id = ?`, [configId], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ success: true });
  });
});

module.exports = router;
