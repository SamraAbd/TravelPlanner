const express = require('express');
const path = require('path');

const app = express();

// Serve static files from FrontEnd
app.use(express.static(path.join(__dirname, '../../FrontEnd')));

// Serve index.html for GET /
app.get('/', (req, res) => {
  const filePath = path.join(__dirname, '../../FrontEnd/index.html');
  console.log('Serving file:', filePath); // yoxlama üçün
  res.sendFile(filePath, (err) => {
    if (err) {
      console.error('Error sending file:', err);
      res.status(500).send('File not found');
    }
  });
});

// Export app for testing
module.exports = app;

// Start server only if file is run directly
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}
