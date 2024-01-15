const express = require('express');
const { json } = require('express');
const apiRouter = require('./routes/api');
const webRouter = require('./routes/web');

const app = express();
const port = 3000;

// Middleware for parsing JSON requests
app.use(json());

// API routes
app.use('/api', apiRouter);

// Web routes
app.use('/', webRouter);

app.set('view engine', 'ejs');

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
