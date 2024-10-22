const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const productRoutes = require('./routes/productRoutes');

const app = express();

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON request bodies

mongoose.connect('mongodb+srv://asaji10:anOUPsT4xSL9p6Vc@marketplace.dgrop.mongodb.net/?retryWrites=true&w=majority&appName=Marketplace')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

app.use('/api', productRoutes); // Route setup

app.get('/', (req, res) => {
  res.send('Marketplace API is running ');
});

// Start the server
const port = process.env.PORT || 3000; 
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
