import { gql } from "apollo-server-express";

export const Query = gql`
  # All database queries
  type Query {
    logins: [Login!]
    login(id: ID): Login
    getLoginByEmail(email: String): Login
    singleLoginByUsername(username: String): Login
    authorizeUser(username: String, password: String): Login
  }
`;
