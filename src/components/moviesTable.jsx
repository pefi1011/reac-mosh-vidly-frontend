import React, { Component } from "react";
import Like from "./common/like";

// We converted the SFC to the CC because we added a method for determining the sort order
// We promoted MovieTable component from SFC to CC
class MoviesTable extends Component {
  raiseSort = path => {
    // clone the object using the spread operator
    // Because we do not have state in our component
    // we changed from "this.state.sortColumn" to "this.props.sortColumn"
    const sortColumn = { ...this.props.sortColumn };

    if (sortColumn.path === path)
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }

    // WE ARE RAISING THE onSort EVENT!!
    this.props.onSort(sortColumn);
  };

  render() {
    // we changed "props" to "this.props" because the props is not a parameter like in SFC
    const { movies, onDelete, onLike } = this.props;

    return (
      <React.Fragment>
        <hr></hr>
        <table className="table">
          <thead>
            <tr>
              {/*  
              INSTEAD OF CALLING THE onSort function,
              we will call the raiseSort method!!
              <th onClick={() => onSort("title")} className="col">
                Title
              </th>*/}
              <th onClick={() => this.raiseSort("title")} className="col">
                Title
              </th>
              <th onClick={() => this.raiseSort("genre.name")} className="col">
                Genre
              </th>
              <th
                onClick={() => this.raiseSort("numberInStock")}
                className="col"
              >
                Stock
              </th>
              <th
                onClick={() => this.raiseSort("dailyRentalRate")}
                className="col"
              >
                Rate
              </th>
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
                  <Like
                    onClick={() => onLike(movie)}
                    liked={movie.liked}
                  ></Like>
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
  }
}

export default MoviesTable;
