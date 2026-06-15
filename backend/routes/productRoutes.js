const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth');
const {getProducts, getProductById, getProductsByCategory, createProduct, updateProduct, deleteProduct} = require('../controllers/productController');

// Public routes

router.get('/', getProducts);
router.get('/:id', getProductById);
router.get('/category/:category', getProductsByCategory);

// Admin routes
router.post('/', authenticateToken, createProduct);
router.put('/:id', authenticateToken, updateProduct);
router.delete('/:id', authenticateToken, deleteProduct);

module.exports = router;