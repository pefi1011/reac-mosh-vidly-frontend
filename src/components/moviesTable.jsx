import React from "react";

import Like from "./common/like";
import Pagination from "./common/pagination";

const MoviesTable = props => {
  const { movies, onDelete, onLike } = props;

  return (
    <React.Fragment>
      <hr></hr>
      <div id="table-header" className="row">
        <div className="col font-weight-bold">Test</div>
        <div className="col font-weight-bold">Genre</div>
        <div className="col font-weight-bold">Stock</div>
        <div className="col font-weight-bold">Rate</div>
        <div className="col font-weight-bold"></div>
        <div className="col font-weight-bold"></div>
      </div>
      <hr></hr>
      <div id="table-content">
        {movies.map(movie => (
          <div key={movie._id}>
            <div className="row">
              <div className="col">{movie.title}</div>
              <div className="col">{movie.genre.name}</div>
              <div className="col">{movie.numberInStock}</div>
              <div className="col">{movie.dailyRentalRate}</div>
              <div className="col">
                <Like onClick={() => onLike(movie)} liked={movie.liked}></Like>
              </div>
              <div className="col">
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => onDelete(movie._id)}
                >
                  Delete
                </button>
              </div>
            </div>
            <hr></hr>
          </div>
        ))}

        <div className="row"></div>
      </div>
    </React.Fragment>
  );
};

export default MoviesTable;
