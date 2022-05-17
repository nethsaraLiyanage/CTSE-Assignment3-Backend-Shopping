const express = require('express');
const Item = require('../models/item');
// const Cart_Item = require('../modals/cart_item')
const Cart = require('../models/cart')
const app = express()

const router = express.Router({});

router.get('/',async (req,res) =>{
    res.status(200).send({message: "Route Called"})
});

//create a cart
router.get('/create/:id',async (req,res) =>{
    const userId = req.params.id;

    const cart = await new Cart({
        user_id : userId,
        items : []
    }).then((data)=> {
        res.status(200).send({message: "Cart Created"})
    })

});


//get cart items from the cart fro logged in user
router.get('/get-cart-items/:id',async (req,res) =>{
    
    try {
        const items = await Cart.findOne({user_id : req.params.id}).populate('items')
        console.log(items);

        res.status(200).send(items['items'])
    } catch (error) {
        res.status(500).send(error)
    }

});

router.put('/add-item/:id', async (req, res, _next) => {

    const item = req.body._id

    const updateCart = await Cart.findOneAndUpdate(
        {user_id : req.params.id}, 
        {$push : {items : item}}
    ).then((data) => {
        res.status(200).json({message: "Successfully Added!", item: item})
    })
});

router.put('/delete-item/:id', async (req, res, _next) => {

    const item = req.body._id

    const updateCart = await Cart.findOneAndUpdate(
        {user_id : req.params.id}, 
        {$pull : {items : item}}
    ).then((data) => {
        res.status(200).json({message: "Successfully Deleted!", item: item})
    })
});

router.put('/empty/:id', async (req, res, _next) => {

    // const item = req.body._id

    const updateCart = await Cart.findOneAndUpdate(
        {user_id : req.params.id}, 
        { $set : {items: [] }},
        {multi:true}
    ).then((data) => {
        res.status(200).json({message: "Successfully Removed!"})
    })
});


// db.collection.update({}, { $set : {'myArray': [] }} , {multi:true} )


// export router with all routes included
module.exports = router;