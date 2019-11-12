// 3RD PARTY LIBS
import jwtDecode from "jwt-decode";
// CUSTOM COMPONENTS
import config from "../config.json";
import http from "./httpService";

const ENDPOINT = config.apiEndpoint + "/auth";
const TOKEN_KEY = "token";

export async function login(email, password) {
  // user is the object of a user which should be registered

  // DO NOT FORGET THAT THE METHOD RETURNS A PROMISE!
  const { data: jwt } = await http.post(ENDPOINT, {
    email: email,
    password: password
  });

  localStorage.setItem(TOKEN_KEY, jwt);

  // SINCE PROPERTY NAME AND VALUE ARE THE SAME, YOU CAN SIMPLIFY THE CODE
  // return http.post(ENDPOINT, { email, password  });
}

export function loginWithJwt(jwt) {
  localStorage.setItem(TOKEN_KEY, jwt);
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY);
}

export function getCurrentUser() {
  try {
    // 1. get the JWT from the local storage
    const jwt = localStorage.getItem(TOKEN_KEY);
    // 2. decode JWT to get the current user (using npm i jwt-decode@2.2.0)
    const user = jwtDecode(jwt);

    return user;
  } catch (ex) {
    // The case when we do not have a valid JWT in the local storage -> anonymous user
    // so we return null, i.e. no user

    return null;
  }
}

export default {
  login,
  logout,
  getCurrentUser,
  loginWithJwt
};
