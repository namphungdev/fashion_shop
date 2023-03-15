const Products = require('../model/product.js'); 

module.exports.getAllProduct = async (req, res) => {
        const allProducts = await Products.find().populate('category');
        res.json(allProducts);  
};

module.exports.getProductById = async (req, res) => {
        const idProduct = await Products.find({_id: req.params.id});
        res.json(idProduct);
};

module.exports.getProductByIdCategoty = async (req, res) => {
        const ProductByCategory = await Products.find({category:req.params.id});
        res.json(ProductByCategory);
};

module.exports.createProduct = async (req, res) => {    
        const newProduct = await Products.create(req.body);
        res.json(newProduct);
}