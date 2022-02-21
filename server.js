require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
require('./config/dbConnect')();
const userRoute = require("./routes/userRoute")
const itemRoute = require("./routes/itemRoute")
const cartRoute = require("./routes/cartRoute")
const orderRoute = require("./routes/orderRoute")

app.use(cors())
app.use(express.json())
app.get("/", (req,res) => {
    res.send("Welcome to the E-Commerce Website Server")
})
app.use("/api/user", userRoute)
app.use("/api/item", itemRoute)
app.use("/api/cart", cartRoute)
app.use("/api/order", orderRoute)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})