import config from "../config.json";
import http from "./httpService";

const ENDPOINT = config.apiEndpoint + "/auth";

export function login(email, password) {
  // user is the object of a user which should be registered

  // DO NOT FORGET THAT THE METHOD RETURNS A PROMISE!
  return http.post(ENDPOINT, {
    email: email,
    password: password
  });

  // SINCE PROPERTY NAME AND VALUE ARE THE SAME, YOU CAN SIMPLIFY THE CODE
  // return http.post(ENDPOINT, { email, password  });
}
