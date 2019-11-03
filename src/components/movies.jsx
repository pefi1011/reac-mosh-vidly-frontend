import React, { Component } from "react";
import { getMovies, deleteMovie } from "../services/fakeMovieService";
import Pagination from "./common/pagination";
import paginate from "../utils/paginate";
import Genre from "./genres";
import { getGenres } from "../services/fakeGenreService";
import MoviesTable from "./moviesTable";

class Movies extends Component {
  state = {
    movies: [], // we initialize the empty array bc it takes some time to get the data from the server. If movies are undefined, we will get a runtime error
    genres: [],
    pageSize: 3,
    currentPage: 1
  };

  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];

    this.setState({ movies: getMovies(), genres });
  }

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
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handleSort = path => {
    console.log("path: ", path);
  };

  render() {
    const { genres, selectedGenre } = this.state;

    return (
      <React.Fragment>
        <div className="container">
          <div className="row justify-content-md-center">
            <div className="col-3">
              <Genre
                genres={genres}
                selectedItem={selectedGenre}
                onItemSelect={this.handleSelectGenre}
              ></Genre>
            </div>
            <div className="col"> {this.renderMovies()}</div>
          </div>
        </div>
      </React.Fragment>
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

    // if selectedGenre is truthy (it is not undefined or empty)
    // and selectedGenre._id are both truthy
    // then filter
    const filteredMovies =
      selectedGenre && selectedGenre._id
        ? allMovies.filter(movie => movie.genre._id === selectedGenre._id)
        : allMovies;

    const movies = paginate(filteredMovies, currentPage, pageSize);

    return (
      <React.Fragment>
        <h4>Showing {filteredMovies.length} movies in the database</h4>;
        <MoviesTable
          movies={movies}
          onLike={this.handleLike}
          onDelete={this.handleDeleteMovie}
          onSort={this.handleSort}
        ></MoviesTable>
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
