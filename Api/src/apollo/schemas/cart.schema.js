const {gql} = require('apollo-server-express');

module.exports = gql`
  type Cart {
    id: ID!
    buyerID: ID
    sellerID : ID
    productId: ID
    cartStatus: String
  }

  extend type Query {
    carts: [Cart]
    cart(id: ID!): Cart
    cartsByBuyerID(id: ID!): [Cart]
    cartsBySellerID (id:ID!) : [Cart]
  }

  extend type Mutation {

    createCart(buyerID : ID ! , sellerID : ID! , productID : ID!) : Cart
    deleteCart(id:ID!):Cart
    decisionCart (id :ID! , decision:String!):Cart
  }
`;
