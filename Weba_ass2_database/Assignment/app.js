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
  res.send('Marketplace API is running');
});

// Get all products or filter by title query
app.get('/api/items', (req, res) => {
  const query = req.query.title; // Capture query parameter 'title'

  if (query) {
    // Filter products based on the title query (case-insensitive)
    const filteredProducts = products.filter(product => 
      product.toLowerCase().includes(query.toLowerCase())
    );

    // If any filtered products exist, return them
    if (filteredProducts.length > 0) {
      res.json(filteredProducts);
    } else {
      res.status(404).send('No items found with that title');
    }
  } else {
    // If no query is provided, return all products
    res.json(products);
  }
});

// Start the server
const port = process.env.PORT || 8080; 
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
