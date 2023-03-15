const Categorys = require('../model/category.js'); 

exports.getAllCategory = async (req, res) => {
        const allCategorys= await Categorys.find();
        res.json(allCategorys);  
};

exports.getCategoryById = async (req, res) => {
        const idCategory = await Categorys.find(req.params._id);
        res.json(idCategory);
};

exports.createCategory = async (req, res) => {    
        const newCategory = await Categorys.create(req.body);
        res.json(newCategory);
}