import config from "../config.json";
import http from "./httpService";

export async function getGenres() {
  return http.get(config.apiEndpoint + "/genres");
}
