const express = require('express')
const userRoute = express.Router()
const User = require("../models/User")
const bcrypt = require('bcryptjs')

// to register user
userRoute.post("/register", async(req, res) => {
    const {name, email, password} = req.body;
    if(!name || !email || !password){
        res.send("Enter all the fields")
    }
    const user = await User.findOne({email})
    if(user){
        res.send("User already Exists")
    }
    const newUser = await User.create({name, email, password})
    res.send("User Registered")
})

// to Login user
userRoute.post("/login", async(req,res) => {
    const {email, password} = req.body;
    if(!email || !password){
        res.status(400).json("Enter all the fields")
    }
    const user = await User.findOne({email})
    if(!user){
        res.status(400).json("User does not exists")
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        res.status(400).json("Invalid Credentials")
    }
    res.json({
        name: user.name
    })
})

module.exports = userRoute