const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CartSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: "User"},
    products: [{
        productId: {type: Schema.Types.ObjectId, ref: "Product"},
        name: {type: String},
        imageUrl: {type: String},
        qty: {type: Number, default: 1},
        price: {type: Number, default: 0},
        total: {type: Number}
    }],
    subTotal: {
        default: 0,
        type: Number
      }
    
});

module.exports = mongoose.model('Cart', CartSchema);