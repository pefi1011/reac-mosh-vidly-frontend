import React from "react";

const handleSaveButton = history => {
  history.replace("/movies");
};

const MovieForm = ({ match, history }) => {
  const { movieId } = match.params;
  return (
    <React.Fragment>
      <h2>Movie Form {movieId}</h2>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => handleSaveButton(history)}
      >
        Save
      </button>
    </React.Fragment>
  );
};

export default MovieForm;
