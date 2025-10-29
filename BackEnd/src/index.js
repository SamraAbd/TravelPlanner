const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// frontend fayllarını serve et
app.use(express.static(path.join(__dirname, '../../frontend')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/index.html'));
});

if (require.main === module) {
  app.listen(port, () => console.log(`Server is running on http://localhost:${port}`));
}

module.exports = app;
