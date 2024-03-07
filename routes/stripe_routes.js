const express = require('express');
require("dotenv").config();

const stripe = require("stripe")(`${process.env.STRIPE_SECRET_KEY}`);
const {v4: uuidv4} = require('uuid');
const router = express.Router();

router.get('/', (req, res, next) => {
    console.log("GET Response from Researcher");
    res.json({
        message: "It works!"
    });
});

router.post("/pay", (req, res, next) => {
    try {
        console.log(req.body.token);
        const {token, amount, email} = req.body;
        const idempotencyKey = uuidv4();
        console.log(token);   
        return stripe.customers.create({
            email: email,
            source: token
        }).then((customers) => {
            stripe.charges.create({
                amount: amount*100, 
                currency:'usd',
                customer: customers.id,
                receipt_email: email
            }, {idempotencyKey});
        }).then((result) => {
            res.status(200).json(result)
        }).catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    }
    catch (err) {
        res.status(400).json({
            error: err.message
        })
    } 
})



module.exports = router;