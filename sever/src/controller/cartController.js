const jwt = require("jsonwebtoken");
require('dotenv').config();

const Cart = require("../model/cart.js");
const Product = require("../model/product.js");

exports.addProductToCart = async (req, res) => {
  const productId = req.body.productId;
  const quantity = Number(req.body.quantity);
  const userId = req.user._id;

  try {
    let cart = await Cart.findOne({ userId: userId });

    if (!cart) {
      cart = new Cart({
        userId: userId,
        items: [{ productId: productId, quantity: quantity }],
      });
    } else {
      let productIndex = cart.items.findIndex((p) => p.productId == productId);
      if (productIndex > -1) {
        cart.items[productIndex].quantity += quantity;
      } else {
        cart.items.push({ productId: productId, quantity: quantity });
      }
    }

    cart.totalQuantity += quantity;
    const product = await Product.findById(productId);
    cart.totalPrice += product.price * quantity;

    await cart.save();
    res.status(201).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.updateProductInCart = async (req, res) => {
  const productId = req.body.productId;
  const quantity = Number(req.body.quantity);
  const userId = req.user._id;

  try {
    let cart = await Cart.findOne({ userId: userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    let productIndex = cart.items.findIndex((p) => p.productId == productId);
    if (productIndex < 0) {
      return res.status(404).json({ message: 'Product not found in cart' });
    }

    const product = await Product.findById(productId);
    const oldQuantity = cart.items[productIndex].quantity;
    cart.items[productIndex].quantity = quantity;
    cart.totalQuantity = cart.totalQuantity - oldQuantity + quantity;
    cart.totalPrice = cart.totalPrice - (product.price * oldQuantity) + (product.price * quantity);

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
// Get cart
exports.getCart = async (req, res, next) => {
  const userId = req.user._id;

  try {
    const cart = await Cart.findOne({ userId: userId }).populate(
      'items.productId'
    );

    res.status(200).json(cart);
  } catch (error) {
    next(error);
  }
};

// Remove product from cart
exports.removeProductFromCart = async (req, res, next) => {
  const { productId } = req.params;
  const userId = req.user._id;

  try {
    let cart = await Cart.findOne({ userId: userId });

    const productIndex = cart.items.findIndex(
      (p) => p.productId.toString() === productId.toString()
    );

    if (productIndex > -1) {
      const product = await Product.findById(productId);
      const quantity = cart.items[productIndex].quantity;
      cart.totalQuantity -= quantity;
      cart.totalPrice -= product.price * quantity;
      cart.items.splice(productIndex, 1);

      // Tính lại tổng số lượng và tổng giá của giỏ hàng
      cart.totalQuantity = cart.items.reduce((total, item) => total + item.quantity, 0);
      cart.totalPrice = cart.items.reduce((total, item) => {
        const productPrice = item.productId.price ? item.productId.price : 0;
        return total + productPrice * item.quantity;
      }, 0);

      await cart.save();
      res.status(200).json(cart);
    } else {
      const error = new Error('Product not found in cart');
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    next(error);
  }
};