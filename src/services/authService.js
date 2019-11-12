// 3RD PARTY LIBS
import jwtDecode from "jwt-decode";
// CUSTOM COMPONENTS
import config from "../config.json";
import http from "./httpService";

const ENDPOINT = config.apiEndpoint + "/auth";

export async function login(email, password) {
  // user is the object of a user which should be registered

  // DO NOT FORGET THAT THE METHOD RETURNS A PROMISE!
  const { data: jwt } = await http.post(ENDPOINT, {
    email: email,
    password: password
  });

  localStorage.setItem("token", jwt);

  // SINCE PROPERTY NAME AND VALUE ARE THE SAME, YOU CAN SIMPLIFY THE CODE
  // return http.post(ENDPOINT, { email, password  });
}

export function logout() {
  localStorage.removeItem("token");
}

export function getCurrentUser() {
  try {
    // 1. get the JWT from the local storage
    const jwt = localStorage.getItem("token");
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
  getCurrentUser
};
