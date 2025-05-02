const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./iae.sqlite');

// Konfigürasyon tablosu oluştur
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS configurations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      language TEXT NOT NULL,
      compileCommand TEXT,
      runCommand TEXT
    )
  `);
});

module.exports = db;
