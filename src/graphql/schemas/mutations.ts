import { gql } from "apollo-server-express";

export const mutations = gql`
  type Mutation {
    addLoginInfo(
      username: String
      email: String
      password: String
    ): CreateLoginResponse

    deleteLoginById(id: ID): DeleteLoginResponse

    deleteByUsername(email: String): DeleteLoginResponse

    updateLastLoginByEmail(email: String): UpdateLoginResponse

    updateUserById(
      id: ID
      username: String
      email: String
      password: String
    ): UpdateLoginResponse
  }
`;
