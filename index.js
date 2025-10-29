// Express-i import et
const express = require('express');
const path = require('path');  // HTML faylı üçün lazım olacaq

// Express app yarad
const app = express();
const port = 3000;

// Static faylları xidmət et
app.use(express.static(__dirname)); // index.html faylını oxumaq üçün

// Route təyin et
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html')); // index.html göstər
});

// Serveri işə sal
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});