const mongoose = require('mongoose');

/**
 * foodType, foodName, rating, owner, ownerColor, price, orignalPrice, image, sticke
 */
const product_schema = mongoose.Schema({
    foodType: String, 
    foodName: String,
    rating: Number,
    owner: String,
    ownerColor: String,
    price: Number, 
    orignalPrice: Number, 
    image: String,
    sticker: String
});

const product_model = mongoose.model('Products', product_schema);

module.exports = product_model;