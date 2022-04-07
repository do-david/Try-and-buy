const {gql} = require('apollo-server-express');

module.exports = gql`
  enum Category {
      Shoes,
      TShirt,
      Pants,
      Jacket,
      Coat,
      Accessory
  }
  enum ProductStatus {
    ToSell,
    SellingInProgress,
    Selled
  }
  type Product {
    id: ID!
    userId: ID!
    title: String!
    priceHT: Float!
    description: String!
    imgUrl: [String!]
    category: Category!
    productStatus: ProductStatus!
  }

  extend type Query {
    products: [Product]
    product(id: ID!): Product
    productByUserID(id: ID!): [Product]
    productCatalog: [Product]
  }
  extend type Mutation {
    createProduct(userId: ID!, title: String!, priceHT: Float!, description: String!,category: String!,imgUrl: [String!]): Product
    updateProduct(id:ID!,title: String!, priceHT: Float!, description: String!,category: String!,imgUrl: [String!], productStatus: String!): Product
    updateProductStatus(id:ID!, productStatus: String!): Product
    deleteProduct(id:ID!): Product
    deleteAllProduct: String
  }
`;
