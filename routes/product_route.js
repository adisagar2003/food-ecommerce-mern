const express = require('express');
const router  = express.Router();
const product_model = require('../db/product_schema');

// middleware that is specific to this router;
router.get('/:limit', async (req, res) => {
    const products = await product_model.find({}).limit(req.params.limit);
    res.status(200).json({
        data: products,
        response: 'success'
    })
});

// serach item by name
router.get('/search/:foodName', async (req, res) => {
    const products = await product_model.find({foodName: new RegExp(`^${req.params.foodName.charAt(0).toUpperCase()}`)});
    res.status(200).json({
        data: products,
        response: 'success'
    })
});

module.exports = router;