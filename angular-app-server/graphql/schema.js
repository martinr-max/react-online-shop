const { buildSchema } = require("graphql");


module.exports = buildSchema(`

    type User {
        _id: ID!
        name: String!
        email: String!
        password: String!
    }

    type Product {
        _id: ID!
        name: String!
        category: String!
        price: Int!
        imageUrl: String!
    }

    type Category {
        _id: ID!
        title: String!
        id: Int!
        items: [Product]!
    }

    type CartItems {
        productId: String!
        qty: Int!
        price: Int!
        imageUrl: String!
        name: String!
        total: Int!
    }

    type Cart {
        user: String!
        products:[CartItems!]!
        subTotal: Int!
    }

    input UserData {
        email: String!
        name: String!
        password: String!
    }

    input ProductData {
        name: String!
        price: Int!
        imageUrl: String!
        category: String!
    }

    input CategoryData {
        title: String!
        id: Int!
    }

    input CartData {
        productId: String
        userId: String!
        price: Int!
    }

    type AuthData {
        userId: String!
        name: String!
        email: String!
        password: String!
    }

    type RootQuery {
        getUser(userId: ID!): AuthData!
        getProductsByCategory(title: String!): Category!
        getCategory: [Category]!
        getCart(userId: String!): Cart!
      }


    type RootMutation {
        createUser(userInput: UserData): User!
        createProduct(productInput: ProductData): Product!
        createCategory(categoryInput: CategoryData!): Category!
        createCart(cartInput: CartData): Cart!
        loginUser(email: String!, password: String!): AuthData!
        removeProduct(cartInput: CartData): Boolean
        logout: Boolean
        
    }

    schema {
        mutation: RootMutation
        query: RootQuery
    }
`)