import http from "./httpService";
import config from "../config.json";

const ENDPOINT = config.apiEndpoint + "/movies";

function movieUrl(id) {
  return `${ENDPOINT}/${id}`;
}

export function getMovies() {
  return http.get(ENDPOINT);
}

export function getMovie(movieId) {
  return http.get(movieUrl(movieId));
}

export function saveMovie(movie) {
  //return http.get(config.apiEndpoint + "/movies/");

  // if movie exists, save the updates
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    return http.put(movieUrl(movie._id), body);
  }

  // otherwise we are creating a movie
  return http.post(ENDPOINT + "/", movie);
}

export function deleteMovie(movieId) {
  http.delete(movieUrl(movieId));
}
