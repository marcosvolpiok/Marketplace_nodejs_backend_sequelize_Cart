const makeExecutableSchema = require("graphql-tools");
const resolvers = require("./resolvers");
const { DateTime } = require('graphql-iso-date')

const typeDefs = `
  type Query {
    getCart: [Cart]
    getCartByUser: Cart
    getCartByUserAndShop(idShop: Int!, state: Int!): Cart
    getCartById(idCart: ID!): [CartDetail]
  }

  type Mutation {
    addCart(input: CartInput): Cart
    updateCart(input: CartUpdateInput): Cart 
    createOrderFromCart(input: CreateOrderFromCartInput): Order
  }

  type Cart {
    id: ID,
    id_cart: ID,
    id_shop: ID,
    id_product: ID,
    id_customer: ID,
    state: Int,
    updated_at: DateTime,
    created_at: DateTime
  }

  type CartDetail{
    id: ID,
    id_cart: ID,
    id_product: ID,
    quantity: Int,
    cart: [Cart],
  }

  type Order {
    id: ID,
    id_shop: ID,
    id_customer: ID,
    id_cart: ID,
    id_state: ID,
    total_amount: Float,
    updated_at: DateTime,
    created_at: DateTime,
    state: String,
    message: String
    orderProduct: OrderProduct,
    orderState: OrderState
  }

  type Order {
    state: String,
    detail: String,
    orderNew: OrderNew
  }

  type OrderNew {
    id: ID,
    id_shop: ID,
    id_customer: ID,
    id_cart: ID,
    total_amount: String,
    id_state: ID
  }

  type OrderProduct {
    id: ID,
    id_order: ID,
    id_product: ID,
    quantity: Int,
    name: String,
    price: String,
    updated_at: DateTime,
    created_at: DateTime
  }

  type OrderState {
    id: ID,
    name: String,
    description: String,
    updated_at: DateTime,
    created_at: DateTime
  }


  input CartInput {
    idProduct: ID,
    idShop: ID,
    quantity: Int
  }

  input CartUpdateInput {
    id: ID,
    quantity: Int
  }

  input CreateOrderFromCartInput {
    idCart: ID
  }

  scalar DateTime
`

module.exports = makeExecutableSchema.makeExecutableSchema({
  typeDefs,
  resolvers
})