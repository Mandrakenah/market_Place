const Product = require('../models/product');

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);  // Success: Product created
  } catch (error) {
    res.status(400).json({ error: error.message });  // Error: Bad request
  }
};

// Get a list of all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);  // Success: Return all products
  } catch (error) {
    res.status(500).json({ error: error.message });  // Error: Server error
  }
};

// Get a single product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);  // Success: Return the product
  } catch (error) {
    res.status(500).json({ error: error.message });  // Error: Server error
  }
};

// Update a product by ID
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);  // Success: Product updated
  } catch (error) {
    res.status(400).json({ error: error.message });  // Error: Bad request
  }
};

// Delete a product by ID
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted' });  // Success: Product deleted
  } catch (error) {
    res.status(500).json({ error: error.message });  // Error: Server error
  }
};
