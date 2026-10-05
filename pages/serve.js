const path = require('path');
const express = require('express');

const app = express();
const PORT = Number(process.env.PORT || 3013);
const publicDir = path.join(__dirname, 'public');

app.get('/', (req, res) => {
  res.sendFile(path.join(publicDir, 'start.html'));
});

app.use(express.static(publicDir));

app.listen(PORT, () => {
  console.log(`Ironbark pages on http://localhost:${PORT}`);
});
