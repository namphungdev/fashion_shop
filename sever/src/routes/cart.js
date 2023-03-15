const express = require('express');
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware.js");
const CartController = require('../controller/cartController.js');

router.get("/", authMiddleware.authenticateUser, CartController.getCart);
router.post("/", authMiddleware.authenticateUser, CartController.addProductToCart);
router.delete("/:productId", authMiddleware.authenticateUser, CartController.removeProductFromCart);
router.patch("/", authMiddleware.authenticateUser, CartController.updateProductInCart);

module.exports = router;