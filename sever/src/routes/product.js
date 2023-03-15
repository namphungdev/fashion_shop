const express = require('express');
const router = express.Router();


const ProductsController = require('../controller/productController.js');
//get all the  Productss
router.get('/', ProductsController.getAllProduct);

router.get('/:id', ProductsController.getProductById);

router.get('/category/:id', ProductsController.getProductByIdCategoty);

router.post('/', ProductsController.createProduct);


module.exports = router;