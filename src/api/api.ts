import { getToken, removeToken, removeUser } from "../authentication";
import { API_BASE_URL } from "../constants";

const getAuthHeaders = (): Record<string, string> => {
  const authenticationToken = getToken();
  if (authenticationToken) {
    return {
      Authorization: "Bearer " + authenticationToken,
    };
  }

  return {};
};

export async function makeQuery<T>(
  query: string,
  variables?: Record<string, any>,
): Promise<{
  errors?: Record<string, any>[];
  data?: T;
}> {
  const response = await fetch(API_BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify({ query: query, variables }),
  });

  const { errors, data } = await response.json();
  if (errors && errors[0].extensions.code === "UNAUTHENTICATED") {
    removeToken();
    removeUser();
    window.location.href = "/sign-in";
  }

  return {
    errors,
    data,
  };
}
