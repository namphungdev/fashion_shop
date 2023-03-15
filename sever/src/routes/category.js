const express = require('express');
const router = express.Router();


const CategorysController = require('../controller/categoryController.js');
//get all the  Productss
router.get('/', CategorysController.getAllCategory);

router.get('/:id', CategorysController.getCategoryById);

router.post('/', CategorysController.createCategory);


module.exports = router;