import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import Select from "./common/select";
import { saveMovie, getMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";

class MovieForm extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: ""
    },
    genres: [],
    errors: {}
  };

  // Define JOI SCHEMA
  // it's not part of the state bc it does not have to change
  schema = {
    _id: Joi.string(),
    title: Joi.string()
      .required()
      .label("Title"),
    genreId: Joi.string()
      .required()
      .label("Genre"),
    numberInStock: Joi.number()
      .positive()
      .max(100)
      .integer()
      .required()
      .label("Stock"),
    dailyRentalRate: Joi.number()
      .greater(0)
      .max(10)
      .precision(2)
      .required()
      .label("Rate")
  };

  async populateGenres() {
    const { data: genres } = await getGenres();

    this.setState({ genres });
  }

  async populateMovie() {
    try {
      // get movie by id
      const { movieId } = this.props.match.params;

      if (movieId === "new") return;

      console.log("get movie by id: ", movieId);
      const { data: foundMovie } = await getMovie(movieId);
      console.log("found movie: ", foundMovie);

      this.setState({ data: this.mapToViewModel(foundMovie) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        console.log("Did not found a movie..");
        return this.props.history.replace("/not-found");
      }
    }
  }

  async componentDidMount() {
    await this.populateGenres();

    await this.populateMovie();
  }

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate
    };
  }

  doSubmit = () => {
    console.log("Form submitted");
    const { history } = this.props;

    // Save the changes
    const savedMovie = saveMovie(this.state.data);
    console.log("savedMovie: ", savedMovie);

    // Redirect the user
    history.push("/movies");
  };

  render() {
    // In our render method we do the object destructuring

    const { history } = this.props;

    return (
      <React.Fragment>
        <h2>Movie Form {"movieId"}</h2>

        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genreId", "Genre", this.state.genres)}
          {this.renderInput("numberInStock", "Number in Stock")}
          {this.renderInput("dailyRentalRate", "Rate")}
        </form>

        <button
          type="button"
          className="btn btn-primary"
          onClick={this.doSubmit}
        >
          Save
        </button>
      </React.Fragment>
    );
  }
}

export default MovieForm;
