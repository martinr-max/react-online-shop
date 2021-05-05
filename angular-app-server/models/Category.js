const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    title: {type: String},
    id: {type: Number},
    items: [{type: Schema.Types.ObjectId,ref: "Product"}]
});

module.exports = mongoose.model('Category', CategorySchema);