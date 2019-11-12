import config from "../config.json";
import http from "./httpService";

const ENDPOINT = config.apiEndpoint + "/users";

export function register(user) {
  // user is the object of a user which should be registered

  // DO NOT FORGET THAT THE METHOD RETURNS A PROMISE!
  return http.post(ENDPOINT, {
    email: user.username,
    password: user.password,
    name: user.name
  });
}
