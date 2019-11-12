import React, { Component } from "react";
import Joi from "joi-browser";

import Form from "./common/form";
import * as userService from "../services/userService";

class RegisterForm extends Form {
  state = {
    data: {
      username: "",
      password: "",
      name: ""
    },
    errors: {}
  };

  schema = {
    username: Joi.string()
      .email()
      .required()
      .label("Username"),
    password: Joi.string()
      .min(5)
      .required()
      .label("Password"),
    name: Joi.string()
      .trim()
      .required()
      .label("Name")
  };

  doSubmit = async () => {
    // Call the server
    console.log("Form submitted");

    try {
      // because the method returns a promise, we need to await it
      // and add async above
      await userService.register(this.state.data);
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };

        // we could pass our own error message
        // or we can use the error msg which we get from the server
        errors.username = ex.response.data;

        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div>
        <h1>Register</h1>

        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "Name")}

          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
