import React, { Component } from "react";
import { getMovies, deleteMovie } from "../services/fakeMovieService";
import Like from "./common/like";
import Pagination from "./common/pagination";

class Movies extends Component {
  state = {
    movies: getMovies(),
    pageSize: 4
  };

  handleDeleteMovie = movieId => {
    console.log("Show current movies in the state");
    console.log(this.state.movies);

    console.log("DELETE MOVIE:", movieId);

    // TODO NE RAZUMEM ZASTO NIJE this.setState({movies: deleteMovie(movieId)})
    this.setState(deleteMovie(movieId));

    console.log("Show current movies in the state");
    console.log(this.state.movies);

    // this.setState({ movies: newMovies });
  };

  handleLike = movie => {
    console.log("Like clicked!");
    console.log("movie: ", movie);

    // We do not change the state directly
    // We make a copy, change values and pass is to the setState
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);

    //  movies[index] = { ...movies[index] };
    // if its true, it becomes false and vice versa
    movies[index].liked = !movies[index].liked;

    this.setState({ movies });

    // THIS WAS THE CODE FOR UPDATING THE UI
    // LATER WE WILL MAKE AN AJAX CALL TO PERSIST THE CHANGES
  };

  handlePageChange = page => {};

  render() {
    return <React.Fragment>{this.renderMovies()}</React.Fragment>;
  }

  renderMovies() {
    const { length: moviesCount } = this.state.movies;

    if (moviesCount === 0)
      return (
        <div className="">
          <h4>There are no movies in the database!</h4>
        </div>
      );

    return (
      <React.Fragment>
        <h4>Showing {moviesCount} movies in the database</h4>
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
          {this.state.movies.map(movie => (
            <div key={movie._id}>
              <div className="row">
                <div className="col">{movie.title}</div>
                <div className="col">{movie.genre.name}</div>
                <div className="col">{movie.numberInStock}</div>
                <div className="col">{movie.dailyRentalRate}</div>
                <div className="col">
                  <Like
                    onClick={() => this.handleLike(movie)}
                    liked={movie.liked}
                  ></Like>
                </div>
                <div className="col">
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.handleDeleteMovie(movie._id)}
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
        <Pagination
          itemsCount={moviesCount}
          // pageSize={this.state.pageSize}
          pageSize={10}
          onPageChange={this.handlePageChange}
        ></Pagination>
      </React.Fragment>
    );
  }
}

export default Movies;
