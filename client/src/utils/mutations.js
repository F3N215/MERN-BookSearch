import { gql } from "@apollo/client";

// executes the login mutation set up using the gql tag
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

// executes the addUser mutation set up using the gql tag
export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

// executes the saveBook mutation set up using the gql tag
export const SAVE_BOOK = gql`
  mutation saveBook(
    $authors: [String]!
    $description: String!
    $bookId: String!
    $image: String!
    $link: String!
    $title: String!
  ) {
    saveBook(
      authors: $authors
      description: $description
      bookId: $bookId
      image: $image
      link: $link
      title: $title
    ) {
      _id
      username
      email
      savedBooks {
        authors
        description
        bookId
        image
        link
        title
      }
    }
  }
`;

// executes the remoeBook mutation set up using the gql tag
export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: String!) {
    removeBook(bookId: $bookId) {
      _id
      username
      email
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
`;
