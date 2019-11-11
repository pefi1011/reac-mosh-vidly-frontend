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

  // if movie exists, save the updates
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    return http.get(config.apiEndpoint + "/movies/" + movie._id, body);
  }

  // otherwise we are creating a movie
  return http.post(config.apiEndpoint, movie);
}

export function deleteMovie(movieId) {
  http.delete(config.apiEndpoint + "/movies/" + movieId);
}
