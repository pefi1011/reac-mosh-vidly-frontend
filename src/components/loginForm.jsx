import React, { Component } from "react";
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

      // redirect user to home page after login
      // this.props.history.push("/");
      // INSTEAD OF REDIRECT USER TO HOME PAGE UPON LOGIN
      // WE HAVE TO DO A FULL RELOAD OF THE APPLICATION
      // bc that will cause our App Component will be mounted again (componentDidMount() will be executed again)
      window.location = "/";
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
