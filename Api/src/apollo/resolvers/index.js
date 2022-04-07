const productResolver = require('./product.resolver');
const userResolver = require('./user.resolver');
const cartResolver = require('./cart.resolver');

module.exports = [
    productResolver,
    userResolver,
    cartResolver
    //tous les resolvers
]