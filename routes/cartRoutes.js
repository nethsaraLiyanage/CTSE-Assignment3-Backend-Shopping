const express = require('express');
const Item = require('../models/item');
// const Cart_Item = require('../modals/cart_item')
const Cart = require('../models/cart')
const app = express()

const router = express.Router({});

router.get('/',async (req,res) =>{
    res.status(200).send({message: "Route Called"})
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

router.post('/cart-item/:id', async (req, res, _next) => {
    console.log(req.body.isSelcted);
    try {
        await Cart.findOneAndUpdate({_id : req.params.id}, {isSelected : req.body.isSelcted})
    } catch (error) {
        
    }
});


// export router with all routes included
module.exports = router;