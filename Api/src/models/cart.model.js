const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    buyerID: {
        type: Schema.Types.ObjectId, ref: 'User'
    },
    sellerID: {
        type: Schema.Types.ObjectId, ref: 'User'
    },
    productId: {
        type: Schema.Types.ObjectId, ref: 'Product'
        
    },
    cartStatus: {
        type: String, enum: [ 'Validated', 'ValidationInProgress','Rejected','Payed','Canceled']
    }
},
{ timestamps: true }
);
module.exports = mongoose.model('Cart', cartSchema);