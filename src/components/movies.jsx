import React, { Component } from "react";
import { getMovies, deleteMovie } from "../services/fakeMovieService";
import Like from "./common/like";
import Pagination from "./common/pagination";
import paginate from "../utils/paginate";
import Genre from "./genres";
import { getGenres } from "../services/fakeGenreService";

class Movies extends Component {
  state = {
    movies: getMovies(),
    pageSize: 2,
    currentPage: 1,
    genres: getGenres(),
    selectedGenre: { _id: "all", name: "All Genres" }
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

  handlePageChange = page => {
    console.log("page clicked: ", page);

    this.setState({ currentPage: page });
  };

  handleSelectGenre = genre => {
    this.setState({ selectedGenre: genre });
  };

  render() {
    return (
      <React.Fragment>
        <div className="container">
          <div className="row justify-content-md-center">
            <div className="col-2">{this.renderGenres()}</div>
            <div className="col-10"> {this.renderMovies()}</div>
          </div>
        </div>
      </React.Fragment>
    );
  }

  renderGenres() {
    const { genres, selectedGenre } = this.state;

    //genres.push({ _id: "0", name: "All Genres" });

    return (
      <Genre
        genres={genres}
        selectedGenre={selectedGenre}
        onSelect={this.handleSelectGenre}
      ></Genre>
    );
  }

  renderMovies() {
    const { length: moviesCount } = this.state.movies;
    const { pageSize, currentPage } = this.state;
    const { selectedGenre } = this.state;

    if (moviesCount === 0)
      return (
        <div className="">
          <h4>There are no movies in the database!</h4>
        </div>
      );

    const allMovies = [...this.state.movies];

    let filteredMovies = allMovies;

    if (selectedGenre._id !== "all") {
      filteredMovies = allMovies.filter(
        movie => movie.genre._id === selectedGenre._id
      );
    }

    const movies = paginate(filteredMovies, currentPage, pageSize);

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
          {movies.map(movie => (
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
          itemsCount={filteredMovies.length}
          pageSize={pageSize}
          onPageChange={this.handlePageChange}
          currentPage={currentPage}
        ></Pagination>
      </React.Fragment>
    );
  }
}

export default Movies;
