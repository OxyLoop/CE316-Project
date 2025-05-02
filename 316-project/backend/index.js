const express = require('express');
const cors = require('cors');
const app = express();

// 🔗 routes bağlantısı
const configRoutes = require('./routes/configRoutes');

app.use(cors());
app.use(express.json());

// 🔗 routes aktif et
app.use('/api/configs', configRoutes);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`✅ Backend çalışıyor: http://localhost:${PORT}`);
});
