const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    createdAt:{
        type: Date,
        default: Date.now,
    },
    image: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    },
    quantity: {
        type: Number,
        required: true,
    },

});
module.exports = mongoose.model('Products', ProductSchema);
