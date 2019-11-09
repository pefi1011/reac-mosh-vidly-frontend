import React, { Component } from "react";

import Input from "./common/input";
import Form from "./common/form";
import Joi from "joi-browser";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
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

  doSubmit = () => {
    console.log("Form submitted");
    // Save the changes
    // Redirect the user
  };

  render() {
    // In our render method we do the object destructuring
    const { data, errors } = this.state;

    return (
      <div>
        <h1>Login</h1>

        <form onSubmit={this.handleSubmit}>
          <Input
            name="username"
            value={data.username}
            label="Username"
            onChange={this.handleChange}
            error={errors.username}
            autoFocus
          />

          <Input
            name="password"
            value={data.password}
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
