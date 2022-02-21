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
    res.send("E-Commerce Website")
})
app.use("/api/user", userRoute)
app.use("/api/item", itemRoute)
app.use("/api/cart", cartRoute)
app.use("/api/order", orderRoute)



app.listen(process.env.port || 5000, () => {
    console.log('Server is running')
})