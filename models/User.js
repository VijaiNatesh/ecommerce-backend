const mongoose = require('mongoose')
const conn = mongoose.createConnection(process.env.MONGO_URL)
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    registered_date: {
        type: Date,
        default: Date.now
    }
})

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
      next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });



const User = conn.model("User", UserSchema)
module.exports = User