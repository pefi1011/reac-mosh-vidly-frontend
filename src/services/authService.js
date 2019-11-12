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
