const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/auth");
const {
    getCart,
    addToCart,
    updateCartItem,
    removeCartItem,
    clearCart
} = require("../controllers/cartController");

router.use(authenticateToken);

// Cart routes
router.get("/", getCart);
router.post("/add", addToCart);
router.put("/update", updateCartItem);
router.delete("/remove/:productId", removeCartItem);
router.delete("/clear", clearCart);

module.exports = router;