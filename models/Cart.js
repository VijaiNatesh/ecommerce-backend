const mongoose = require('mongoose');
const conn = mongoose.createConnection(process.env.MONGO_URL)

const CartSchema = new mongoose.Schema({
    userId: {
        type: String
    },
    items: [{
        productId: {
            type: String,
        },
        name: String,
        quantity: {
            type: Number,
            required: true,
            min: [1, 'Quantity can not be less then 1.'],
            default: 1
        },
        price: Number
    }],
    bill: {
        type: Number,
        required: true,
        default: 0
    }
});

const Cart = conn.model("Cart", CartSchema)
module.exports = Cart