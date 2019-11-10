import React, { Component } from "react";
import { getMovies, deleteMovie } from "../services/fakeMovieService";
import Pagination from "./common/pagination";
import paginate from "../utils/paginate";
import Genre from "./genres";
import { getGenres } from "../services/genreService";
import MoviesTable from "./moviesTable";
import Input from "./common/input";
import _ from "lodash";
import SearchBox from "./common/searchBox";

class Movies extends Component {
  state = {
    movies: [], // we initialize the empty array bc it takes some time to get the data from the server. If movies are undefined, we will get a runtime error
    genres: [],
    pageSize: 3,
    currentPage: 1,
    searchQuery: "",
    selectedGenre: null,
    sortColumn: { path: "title", order: "asc" }
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
    this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      selectedGenre,
      searchQuery,
      movies: allMovies
    } = this.state;

    let filtered = allMovies;

    if (searchQuery)
      filtered = allMovies.filter(movie =>
        movie.title.toUpperCase().startsWith(searchQuery.toUpperCase())
      );
    else if (selectedGenre && selectedGenre._id)
      filtered = allMovies.filter(
        movie => movie.genre._id === selectedGenre._id
      );

    const sortedData = _.orderBy(
      filtered,
      [sortColumn.path],
      [sortColumn.order]
    );

    const movies = paginate(sortedData, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  handleClick = history => {
    history.push("/movies/new");
  };

  handleSearch = query => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  render() {
    const { genres, selectedGenre } = this.state;
    const { history } = this.props;

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
            <div className="col">
              <div className="row mb-4">
                <button
                  className="btn btn-primary"
                  onClick={() => this.handleClick(history)}
                >
                  {"New Movie"}
                </button>
              </div>
              <div className="row"> {this.renderMovies()}</div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }

  renderMovies() {
    const { length: moviesCount } = this.state.movies;
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;

    if (moviesCount === 0) return <p>There are no movies in the database!</p>;

    const { totalCount, data: movies } = this.getPagedData();

    return (
      <React.Fragment>
        <h4>Showing {totalCount} movies in the database</h4>
        <SearchBox value={searchQuery} onChange={this.handleSearch}></SearchBox>
        <MoviesTable
          movies={movies}
          onLike={this.handleLike}
          onDelete={this.handleDeleteMovie}
          onSort={this.handleSort}
          sortColumn={sortColumn}
        ></MoviesTable>
        <Pagination
          itemsCount={totalCount}
          pageSize={pageSize}
          onPageChange={this.handlePageChange}
          currentPage={currentPage}
        ></Pagination>
      </React.Fragment>
    );
  }
}

export default Movies;
