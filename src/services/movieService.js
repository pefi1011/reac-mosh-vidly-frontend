import http from "./httpService";
import config from "../config.json";

export function getMovies() {
  return http.get(config.apiEndpoint + "/movies");
}

export function getMovie(movieId) {
  return http.get(config.apiEndpoint + "/movies/" + movieId);
}

export function saveMovie(movie) {
  //return http.get(config.apiEndpoint + "/movies/");
}

export function deleteMovie(movieId) {
  http.delete(config.apiEndpoint + "/movies/" + movieId);
}
