// dot env
require('dotenv').config({ silent: true });
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.argv[2] || process.env.PORT || 3000;
if (process.env.NODE_ENV == 'development') require('dotenv').config({ silent: true });
// Set default static assets folder
app.use(express.static(path.join(__dirname, 'public')));

// This will parse our payload from fetch which is sent as a JSON object
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Modular routes

// import router for our API
// const apiPuppiesRouter = require('./routes/api/puppies');

// map our apiRouter to the '/api' route
// app.use('/api/puppies', apiPuppiesRouter);

app.listen(PORT, () => {
  console.log('woof! 🐶');
});
