const express = require('express');
const cors = require('cors');
const nights = require('./routes/nights');
const labels = require('./routes/labels');

const app = express();
const PORT = Number(process.env.PORT || 3012);

app.use(cors());
app.use(express.json());
app.use('/open/nights', nights);
app.use('/labels', labels);

app.listen(PORT, () => {
  console.log(`Ironbark service on http://localhost:${PORT}`);
});
