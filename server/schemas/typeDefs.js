// const { gql } = require("apollo-server-express");
// define query and mutation functionality

const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: Int
    savedBooks: [Book]
  }

  type Book {
    bookId: ID
    authors: [String]
    description: String
    title: String
    image: String
    link: String
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(
      authors: [String]!
      description: String!
      bookId: String!
      image: String!
      link: String!
      title: String!
    ): User
    removeBook(bookId: String!): User
  }
  type Auth {
    token: ID!
    user: User
  }
`;
// export the typeDefs
module.exports = typeDefs;
