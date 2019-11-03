import React, { Component } from "react";
import Like from "./common/like";
import TableHeader from "./common/tableHeader";
// We converted the SFC to the CC because we added a method for determining the sort order
// We promoted MovieTable component from SFC to CC
class MoviesTable extends Component {
  // Columns are not the part of the state
  // because they are not going to change
  // throghout the lifecycle of this component (MoviesTable)
  columns = [
    { path: "title", label: "Title" },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    { key: "like" }, // we have empty objects for the like and delete columns. They do not have label and path for sorting, so we just have empty objects
    { key: "delete" } // we added the "key" property because we are using it in the map function within the TableHeader component
  ];

  render() {
    // we changed "props" to "this.props" because the props is not a parameter like in SFC
    const { movies, sortColumn, onDelete, onLike, onSort } = this.props;

    return (
      <React.Fragment>
        <hr></hr>
        <table className="table">
          <TableHeader
            columns={this.columns}
            sortColumn={sortColumn}
            onSort={onSort}
          ></TableHeader>

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
