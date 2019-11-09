import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";

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
      .less(6)
      .integer()
      .required()
      .label("Stock"),
    dailyRentalRate: Joi.number()
      .greater(0)
      .less(6)
      .precision(2)
      .required()
      .label("Rate")
  };

  doSubmit = history => {
    console.log("Form submitted");
    // Save the changes
    // Redirect the user

    history.replace("/movies");
  };

  render() {
    // In our render method we do the object destructuring

    const { history } = this.props;

    return (
      <React.Fragment>
        <h2>Movie Form {"movieId"}</h2>
        <button
          type="button"
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
