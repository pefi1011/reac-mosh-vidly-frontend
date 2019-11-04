import React from "react";

const MovieForm = ({ match }) => {
  const { movieId } = match.params;
  return (
    <React.Fragment>
      <h2>Movie Form {movieId}</h2>
    </React.Fragment>
  );
};

export default MovieForm;
