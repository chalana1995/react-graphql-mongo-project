const transactionTypeDef = `#graphql
 type Transaction {
    _id: ID!
    userId: ID!
    description: String!
    pamentType:String!
    category: String!
    amount: Float!
    location: String!
    date: String!
 }

 type Query {
    transactions: [Transaction!]
    transaction(trancsactionId:ID!): Transaction
 }

 type Mutation {
    createTransaction(input: CreateTransactionInput!): Transaction!
    updateTransaction(input: UpdateTransactionInput!): Transaction!
    deleteTransaction(trancsactionId:ID!): Transaction!
 }

 type CategoryStatistics {
    category: String!
    totalAmount: Float!
  }

  input CreateTransactionInput {
    description: String!
    paymentType: String!
    category: String!
    amount: Float!
    date: String!
    location: String
  }

  input UpdateTransactionInput {
    transactionId: ID!
    description: String
    paymentType: String
    category: String
    amount: Float
    location: String
    date: String
  }
`;

export default transactionTypeDef;