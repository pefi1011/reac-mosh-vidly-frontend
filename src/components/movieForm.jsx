import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";

import { saveMovie } from "../services/fakeMovieService";

class MovieForm extends Form {
  state = {
    data: { title: "", genre: "", numberInStock: "", dailyRentalRate: "" },
    errors: {}
  };

  // Define JOI SCHEMA
  // it's not part of the state bc it does not have to change
  schema = {
    title: Joi.string()
      .required()
      .label("Title"),
    genre: Joi.string()
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

  doSubmit = history => {
    console.log("Form submitted");
    // Save the changes

    const { title, genre, numberInStock, dailyRentalRate } = this.state.data;

    const day = new Date();
    const now = day.getUTCDate();

    const movie = {
      name: title,
      genreId: "5b21ca3eeb7f6fbccd471818",
      numberInStock: numberInStock,
      dailyRentalRate: dailyRentalRate,
      publishDate: now,
      liked: false
    };

    console.log("movie: ", movie);
    const savedMovie = saveMovie(movie);
    console.log("savedMovie: ", savedMovie);

    // Redirect the user

    history.replace("/movies");
  };

  render() {
    // In our render method we do the object destructuring

    const { history } = this.props;

    return (
      <React.Fragment>
        <h2>Movie Form {"movieId"}</h2>

        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderInput("genre", "Genre")}
          {this.renderInput("numberInStock", "Number in Stock")}
          {this.renderInput("dailyRentalRate", "Rate")}
        </form>

        <button
          type="button"
          disabled={this.validate()}
          className="btn btn-primary"
          onClick={() => this.doSubmit(history)}
        >
          Save
        </button>
      </React.Fragment>
    );
  }
}

export default MovieForm;
