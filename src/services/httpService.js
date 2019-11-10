import axios from "axios";
import logger from "./logService";

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
    alert.error("An unexpected error occurred!");
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
