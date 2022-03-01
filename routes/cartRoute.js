const express = require("express")
const cartRoute = express.Router()
const Cart = require('../models/Cart')
const Item = require('../models/Item')


cartRoute.post('/addcart/:id', async (req, res) => {
    const userId = req.params.id
    const { productId, quantity } = req.body

    try {
        let cart = await Cart.findOne({ userId })
        let item = await Item.findOne({ _id: productId })
        if (!item) {
            res.send("Item not found")
        }
        const price = item.price
        const name = item.title
        if (cart) {
            let itemIndex = cart.items.findIndex(p => p.productId == productId)

            if (itemIndex > -1) {
                let productItem = cart.items[itemIndex]
                productItem.quantity += quantity
                cart.items[itemIndex] = productItem
            }
            else {
                cart.items.push({ productId, name, quantity, price })
            }
            cart.bill += quantity * price
            cart.save()
            res.send("Item added to cart")
        }
        else {
            let item = await Item.findOne({ _id: productId })
            if (!item) {
                res.send("Item not found")
            }
            const price = item.price
            const name = item.title
            let newCart = await Cart.create({
                userId,
                items: [{ productId, name, quantity, price }],
                bill: quantity * price
            })
            res.send("Item added to Cart")
        }
    }
    catch (err) {
        res.send("Something went wrong")
    }
})

cartRoute.get("/cartdetails/:id", async(req, res) => {
    const userId = req.params.id
    try{
        let cart = await Cart.findOne({userId});
        if(cart && cart.items.length>0){
            res.send(cart);
        }
        else{
            res.send(null);
        }
    }
    catch(err){
        res.send("Something went wrong");
    }
})

cartRoute.put("/update/:id", async(req, res) => {
    const userId = req.params.id;
    const { productId, qty } = req.body;

    try{
        let cart = await Cart.findOne({userId});
        let item = await Item.findOne({_id: productId});

        if(!item)
            return res.send('Item not found!'); // not returning will continue further execution of code.
        
        if(!cart)
          return res.send("Cart not found");
        else{
            // if cart exists for the user
            let itemIndex = cart.items.findIndex(p => p.productId == productId);

            // Check if product exists or not
            if(itemIndex == -1)
              return res.send('Item not found in cart!');
            else {
                let productItem = cart.items[itemIndex];
                productItem.quantity = qty;
                cart.items[itemIndex] = productItem;
            }
            cart.bill = cart.items.reduce((sum, item) => sum + item.price * item.quantity,0);
            cart = await cart.save();
            return res.send(cart);
        }     
    }
    catch (err) {
        // just printing the error wont help us find where is the error. Add some understandable string to it.
        console.log("Error in update cart", err);
        res.send("Something went wrong");
    }
})

cartRoute.delete("/cartdelete/:userId/:itemId", async(req, res) => {
    try{
        let cart = await Cart.findOne({userId});
        let itemIndex = cart.items.findIndex(p => p.productId == productId);
        if(itemIndex > -1)
        {
            let productItem = cart.items[itemIndex];
            cart.bill -= productItem.quantity*productItem.price;
            cart.items.splice(itemIndex,1);
        }
        cart.save();
        return res.status(201).send(cart);
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong");
    }
})

module.exports = cartRoute