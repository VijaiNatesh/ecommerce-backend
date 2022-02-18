const express = require('express')
const orderRoute = express.Router()
const Order = require('../models/Order')
const Cart = require("../models/Cart")

orderRoute.post('/addorder/:id', async (req, res) => {
    const userId = req.params.id
    const cart =  await Cart.findOne({userId})
    const order = await Order.create({
        userId,
        items: cart.items,
        bill: cart.bill
    })
    const data = await Cart.findByIdAndDelete({_id:cart.id});
    return res.status(201).send(order);    
})

module.exports = orderRoute