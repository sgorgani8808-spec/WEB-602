var express = require('express');
var app = express();

app.get('/home', (req, res) => {
  res.send('Home Page');
});

app.get('/about', (req, res) => {
  res.send('About');
});

// ✅ CORRECT 404 handler (NO '*')
app.use((req, res) => {
  res.status(404).send('404! This is an invalid URL.');
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
