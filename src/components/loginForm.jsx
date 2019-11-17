import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Joi from "joi-browser";

import Form from "./common/form";
import authService from "../services/authService";

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

  doSubmit = async () => {
    console.log("Form submitted");
    // Save the changes
    // Redirect the use

    try {
      const { data } = this.state;
      await authService.login(data.username, data.password);

      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    // In our render method we do the object destructuring

    // if the user is logged in, we redirect it to the homepage
    // we did not use window.location = "/" because we use that only when the user
    // is trying to login -> we want to reload the app, so it gets in the correct state by knowing the current user
    if (authService.getCurrentUser()) return <Redirect to="/" />;

    return (
      <div>
        <h1>Login</h1>

        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}

          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
