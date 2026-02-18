require('./models/Registration');

require('dotenv').config(); // MUST be first

console.log('ENV DATABASE =', process.env.DATABASE);

const mongoose = require('mongoose');
const app = require('./app');

// connect to MongoDB
mongoose.connect(process.env.DATABASE);

mongoose.connection
  .on('open', () => console.log('Mongoose connection open'))
  .on('error', err => console.log(`Connection error: ${err.message}`));

const server = app.listen(3000, () => {
  console.log(`Express is running on port ${server.address().port}`);
});
