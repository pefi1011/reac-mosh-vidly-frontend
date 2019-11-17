import axios from "axios";
import logger from "./logService";
import authService from "./authService";

// whenever you want to send a request,
// axios make sure to include this headers
// if the user is not logged in, getJwt() will return undefined and the header will not be set
axios.defaults.headers.common["x-auth-token"] = authService.getJwt();

// include headers only in post requests
//axios.defaults.headers.post["x-auth-token"] = authService.getJwt();

axios.interceptors.response.use(null, error => {
  // Whenever we have a response with an error
  // This function will be called first
  // And then the control will pass to our catch block

  const expectedError =
    error.response &&
    (error.response.status >= 400) & (error.response.status < 500);

  if (!expectedError) {
    // LOGGING THE ERROR ONLY IF ITS UNEXPECTED

    //1. log the error
    logger.log(error);
    // console.log("Logging the unexpected error", error);
    // 2. show a generic and friendly error msg
    alert("An unexpected error occurred!");
  }

  // FORWARD THE EXPECTED ERRORS
  // to pass a control to our catch block
  // we need to return the rejected promise
  // Promise.reject() creates a promise with the "rejected" state
  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  patch: axios.patch
};
