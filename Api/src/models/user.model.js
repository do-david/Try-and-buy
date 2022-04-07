const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    phoneNumber: String,
    email: String,
    password: String,
    avatar: String,
    address: {
        lat: Number,
        lng: Number,
        localisation: String
    },
    role: {
        type: String,
        enum: ['Buyer','Seller','Admin'],
    },
    //necessaire pour les seller afin de connaitre les buyers interesse par le produit
    offers: [
        {userId: {type: Schema.Types.ObjectId, ref: 'User'}, productId: {type: Schema.Types.ObjectId, ref: 'Product'}}
    ],
    //necessaire pour les buyer afin de savoir si le produit a été validé par la seller avant de pourvoir prendre sa commande
    carts: [{cartId: {type: Schema.Types.ObjectId, ref: 'Cart'}}],
    wishlist: [{productId:{ type: Schema.Types.ObjectId, ref: 'Product' }}]
},
    { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);