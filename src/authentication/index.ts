import { SignInMutation, User } from "../graphql/graphql";

const TOKEN_KEY = "token";
const USER_KEY = "user";

export const updateToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

export const updateUser = (user: User) => {
  return localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const removeUser = () => {
  localStorage.removeItem(USER_KEY);
};

export const getUser = (): User | null => {
  const item = localStorage.getItem(USER_KEY);
  if (item) {
    return JSON.parse(item) as User;
  }
  return null;
};

export const isLoggedIn = (): boolean => {
  return localStorage.getItem(TOKEN_KEY) !== null;
};
