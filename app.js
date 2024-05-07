const express = require('express');
const mongoose = require('mongoose');
const emailRoutes = require('./routes/emailRoutes');
const config = require('./config');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = config.mongoURI;;

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  })
  .catch(err => console.error('Error connecting to MongoDB:', err));

app.use(express.json());
app.use('/emails', emailRoutes);

module.exports = app;
