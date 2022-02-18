const mongoose = require('mongoose');
const conn = mongoose.createConnection(process.env.MONGO_URL)

const ItemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    date_added: {
        type: Date,
        default: Date.now
    },
});

const Item = conn.model("Item", ItemSchema)
module.exports = Item
