const mongoose = require('mongoose');
const uniquValidator = require('mongoose-unique-validator');


const userSchema = new mongoose.Schema({
    email: {type: String, required:true, unique: true},
    name: {type: String, required: true },
    password: { type: String, required: true},
    cart: {type: mongoose.Schema.Types.ObjectID, ref: 'Cart' }
});

userSchema.plugin(uniquValidator);

module.exports = mongoose.model('User', userSchema);