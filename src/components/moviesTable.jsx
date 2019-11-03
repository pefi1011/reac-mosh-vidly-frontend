import React from "react";

import Like from "./common/like";
import Pagination from "./common/pagination";

const MoviesTable = props => {
  const { movies, onDelete, onLike, onSort } = props;

  return (
    <React.Fragment>
      <hr></hr>
      <table className="table">
        <thead>
          <tr>
            <th className="col">Title</th>
            <th className="col">Genre</th>
            <th className="col">Stock</th>
            <th className="col">Rate</th>
            <th className="col"></th>
            <th className="col"></th>
          </tr>
        </thead>
        <tbody>
          {movies.map(movie => (
            <tr key={movie._id}>
              <th className="row"> {movie.title} </th>
              <td className="">{movie.genre.name}</td>
              <td className="">{movie.numberInStock}</td>
              <td className="">{movie.dailyRentalRate}</td>
              <td className="">
                <Like onClick={() => onLike(movie)} liked={movie.liked}></Like>
              </td>
              <td className="">
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => onDelete(movie._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </React.Fragment>
  );
};

export default MoviesTable;
