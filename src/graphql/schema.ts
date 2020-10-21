import {
  CreateLoginResponse,
  LoginProfile,
  DeleteLoginResponse,
  UpdateLoginResponse,
} from "./schemas/login/login";
import { mutations } from "./schemas/mutations";
import { Query } from "./schemas/query";

export const typeDefs = [
  Query,
  CreateLoginResponse,
  LoginProfile,
  DeleteLoginResponse,
  mutations,
  UpdateLoginResponse,
];
