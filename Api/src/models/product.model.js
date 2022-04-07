const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User'},
    title: String,
    priceHT: Number,
    description: String,
    imgUrl: [String],
    category: {
        type: String,
        enum: ['Shoes','TShirt','Pants','Jacket','Coat','Accessory'],
    },
    productStatus: {
        type: String,
        enum: [ 'ToSell', 'SellingInProgress','Selled']
    }
},
    { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);