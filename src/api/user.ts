import {
  CreateUserInput,
  CreateUserMutation,
  SignInMutation,
  SignInUserInput,
} from "../graphql/graphql";
import { makeQuery } from "./api";
import { ApiError } from "./error";

export const createUser = async (
  input: CreateUserInput,
): Promise<CreateUserMutation["createUser"]> => {
  const mutation = /* graphql */ `
    mutation createUser($input: CreateUserInput!) {
      createUser(input: $input) {
        access_token
        user {
          id
          username
        }
      }
    }
  `;
  const { errors, data } = await makeQuery<CreateUserMutation>(mutation, {
    input,
  });
  if (!data) {
    throw new ApiError("Failed to create user", errors);
  }
  return data.createUser;
};

export const signInUser = async (
  input: SignInUserInput,
): Promise<SignInMutation["signIn"]> => {
  const mutation = /* graphql */ `
    mutation signIn ($input: SignInUserInput!) {
      signIn(input: $input) {
        access_token
        user {
          id
          username
        }
      }
    }
  `;

  const { errors, data } = await makeQuery<SignInMutation>(mutation, {
    input,
  });
  if (!data) {
    throw new ApiError("Failed to sign in", errors);
  }
  return data.signIn;
};
