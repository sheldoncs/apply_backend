import { gql } from "apollo-server-express";

export const LoginProfile = gql`
  scalar Date
  type Login {
    id: ID
    username: String
    email: String
    password: String
    imgblob: String
  }
`;

export const CreateLoginResponse = gql`
  type CreateLoginResponse {
    message: String!
    Login: Login
  }
`;

export const DeleteLoginResponse = gql`
  type DeleteLoginResponse {
    message: String!
    deletedLogin: Login
  }
`;
export const UpdateLoginResponse = gql`
  type UpdateLoginResponse {
    message: String!
    updateLogin: Login
  }
`;
