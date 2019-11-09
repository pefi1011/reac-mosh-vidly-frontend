import React, { Component } from "react";

import Input from "./common/input";
import Joi from "joi-browser";
import { register } from "../serviceWorker";

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
    const joiOptions = {
      abortEarly: false
    };

    const { error } = Joi.validate(this.state.account, this.schema, joiOptions);

    // no validation error founds
    if (!error) return null;

    const errors = {};

    // mapping an array into object
    for (let item of error.details) errors[item.path[0]] = item.message;

    return errors;
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

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);

    // If the error is truthy, we return the error msg otherwise null
    return error ? error.details[0].message : null;
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
            autoFocus
          />

          <Input
            name="password"
            value={account.password}
            label="Password"
            onChange={this.handleChange}
            error={errors.password}
          />

          {/** this.validate() returns null or an error object null is considers as falsy, 
          so the disabled will be set to false. 
          An object is considered to be truthy, so disabled will be set to true */}
          <button disabled={this.validate()} className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
