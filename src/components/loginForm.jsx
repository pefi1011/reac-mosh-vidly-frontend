import React, { Component } from "react";

import Input from "./common/input";
import Joi from "joi-browser";

class LoginForm extends Component {
  state = {
    account: { username: "", password: "" },
    errors: {}
  };

  // Define JOI SCHEMA
  // it's not part of the state bc it does not have to change
  schema = {
    username: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  // 2. Creating a ref object
  username = React.createRef();

  validate = () => {
    const { error } = Joi.validate(this.state.account, this.schema, {
      abortEarly: false
    });

    // no validation error founds
    if (!error) return null;

    const errors = {};

    // mapping an array into object
    for (let item of error.details) errors[item.path[0]] = item.message;

    return errors;
    /*
    console.log("result: ", result);
    const errors = {};

    const { account } = this.state;

    // for each input field we write validation logic
    if (account.username.trim() === "")
      errors.username = "Username is required.";

    if (account.password.trim() === "")
      errors.password = "Password is required.";

    return Object.keys(errors).length === 0 ? null : errors; */
  };

  handleSubmit = e => {
    e.preventDefault();

    const errors = this.validate();
    // If errors is truthy (it exists), then we pass errors to the state, otherwise we pass an empty object
    this.setState({ errors: errors || {} });

    // if there are any errors, we return, i.e. we abort the form submition. We do not call the server
    if (errors) return;

    console.log("Form submitted");
    // Save the changes
    // Redirect the user
  };

  validateProperty = ({ value, name }) => {
    if (name === "username") {
      if (value.trim() === "") return "Username is required.";
      // other rules
    }
    if (name === "password") {
      if (value.trim() === "") return "Password is required.";
      // other rules
    }
  };

  handleChange = ({ currentTarget: input }) => {
    // we are not calling
    // this.validate()
    // bc we just want to validate the current field, not the entire form!
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);

    // If there are errors, we set the error for the given field
    // otherwise we delete them
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    // we use the spread opperator to clone the account object from the state
    const account = { ...this.state.account };

    account[input.name] = input.value;

    this.setState({ account, errors });
  };

  render() {
    // In our render method we do the object destructuring
    const { account, errors } = this.state;

    return (
      <div>
        <h1>Login</h1>

        <form onSubmit={this.handleSubmit}>
          <Input
            name="username"
            value={account.username}
            label="Username"
            onChange={this.handleChange}
            error={errors.username}
          />

          <Input
            name="password"
            value={account.password}
            label="Password"
            onChange={this.handleChange}
            error={errors.password}
          />

          <button className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
