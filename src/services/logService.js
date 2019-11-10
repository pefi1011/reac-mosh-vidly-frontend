import Raven from "raven-js";

function init() {
  // Raven.config("https://7fb8306ffb0a43caa3cef3963d8b1bca@sentry.io/1814815", {
  //   release: "0-0-1",
  //   environment: "development-test"
  // }).install();
}

function log(error) {
  // Raven.captureException(error);

  console.error(error);
}

export default {
  init,
  log
};
