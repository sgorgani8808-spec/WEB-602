var express = require('express');
var app = express();

// middleware (important)
app.use(express.json());

// import router
var routedemo = require('./exp_demo3a.js');

// mount router
app.use('/routedemo', routedemo);

// root route
app.get('/', (req, res) => {
  res.send('Root page working. Try /routedemo/home');
});

// start server
app.listen(3001, () => {
  console.log('Server running at http://localhost:3001');
});
