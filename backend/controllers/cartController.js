const Cart = require('../models/cart');
const Product = require('../models/product');

// Get cart for a user
const getCart = async (req, res) => {
    try {
        let cart = await Cart.findOne({ userId: req.userId });
        if (!cart) {
            cart = new Cart({ userId: req.userId, items: [] });
            await cart.save();
        }
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add item to cart
const addToCart = async (req, res) => {
    try {
        const { productId, quantity = 1, size, color } = req.body;

        // Find the product
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Find user cart
        let cart = await Cart.findOne({ userId: req.userId });
        if (!cart) {
            cart = new Cart({ userId: req.userId, items: [] });
        }

        // Check if product already in cart
        const existingItemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

        if (existingItemIndex !== -1) {
            cart.items[existingItemIndex].quantity += quantity;
        } else {
            cart.items.push({
                productId: product._id,
                name: product.name,
                price: product.price,
                quantity: quantity,
                image: product.image,
                size: size,
                color: color
            });
        }
        
        await cart.save();
        res.json(cart);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update cart item quantity
const updateCartItem = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const cart = await Cart.findOne({ userId: req.userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
        if (itemIndex === -1) {
            return res.status(404).json({ message: "Item not found in cart" });
        }

        if (quantity <= 0) {
            // Remove item if quantity is zero or less
            cart.items = cart.items.filter(item => item.productId.toString() !== productId);
        } else {
            cart.items[itemIndex].quantity = quantity;
        }
        
        await cart.save();
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Remove item from cart
const removeCartItem = async (req, res) => {
    try {
        const { productId } = req.params;
        const cart = await Cart.findOne({ userId: req.userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        
        cart.items = cart.items.filter(item => item.productId.toString() !== productId);
        await cart.save();
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Clear cart
const clearCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        
        cart.items = [];
        await cart.save();
        res.json({ message: "Cart cleared successfully", cart });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getCart,
    addToCart,
    updateCartItem,
    removeCartItem,
    clearCart
};