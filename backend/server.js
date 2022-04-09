const express = require('express');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 5000;

const app = express();

app.use('/api/lists/active', require('./routes/activeListRoutes'));

app.use('/api/lists/saved', require('./routes/savedListRoutes'));

app.listen(port, () => console.log(`Server started on port ${port}`));