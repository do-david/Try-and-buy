const {gql} = require('apollo-server-express');

module.exports = gql`
    enum Role {
        Buyer,
        Seller,
        Admin
    }
    type User {
        id: ID!
        firstName: String!
        lastName: String!
        phoneNumber: String!
        email: String!
        password: String!
        avatar: String
        address: Address
        role: Role!
        offers: [Offer]
        carts: [CartId]
        wishlist: [ProductId]
    }
    type ProductId {
        productId: ID
    }
    type Offer {
        userId: ID
        productId: ID
    }
    input OfferInput {
        userId: String
        productId: String
    }
    type CartId {
        cartId: ID
    }
    input CartInput {
        userId: ID
        productId: ID
        productStatus: String
    }
    type Address {
        lat: Float!
        lng: Float!
        localisation: String!
    }
    input AddressInput {
        lat: Float!
        lng: Float!
        localisation: String!
    }
    type SignIn {
        auth: Boolean
        token: String
    }
    extend type Query {
        users: [User]
        user(id: ID!): User
        login(email: String!, password: String!): SignIn
        logout: SignIn
        wishlist(userId: ID!): [ProductId]
    }
    extend type Mutation {
        createUser(firstName: String!, lastName: String!, phoneNumber: String!,address:AddressInput, email: String!, password: String!, avatar: String!,role:String!,offers: OfferInput, carts: CartInput): User
        updateUser(id:ID!,firstName: String!, lastName: String!, phoneNumber: String!,address:AddressInput, email: String!, password: String!, avatar: String!,role:String!): User
        addToCart(userId: ID,productId: ID,productStatus: String): User
        addToWishlist(userId: ID,productId: ID): ProductId
        deleteUser(id:ID!): User
        deleteAllUser: String
    }
`;
