const { gql } = require("apollo-server-express"); // define query and mutation functionality

const typeDefs = gql`
  type Query {
    me: User
    users: [User]
  }
  type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
  }
  type Book {
    bookId: String
    authors: [String]
    description: String
    title: String
    image: String
    link: String
  }
  type Auth {
    token: ID!
    user: User
  }
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(
      bookid: String!
      author: [String]!
      description: String
      title: String
      image: String
      link: String
    ): User
    removeBook(bookId: String): User
  }
`;

module.exports = typeDefs; // export typeDefs to be used in server.js
