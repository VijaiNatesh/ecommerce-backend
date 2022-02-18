const express = require('express')
const itemRoute = express.Router()
const Item = require('../models/Item')

// to add an item
itemRoute.post('/add', async(req,res) => {
    const newItem = await Item.create(req.body);
    newItem.save()
    res.send("Item Added")
})

// to get all the items
itemRoute.get('/allitems', async(req,res) => {
    const items = await Item.find()
    res.send(items)
})

// to edit an item
itemRoute.put('/edititem/:id', async(req, res) => {
    const item = await Item.findByIdAndUpdate({_id: req.params.id}, req.body)
    item.save()
    res.send(item)
})

// to delete an item
itemRoute.delete('/deleteitem/:id', async(req,res) =>{
    await Item.findByIdAndDelete({_id: req.params.id})
    res.status(400).json("Item Deleted")
})

module.exports = itemRoute