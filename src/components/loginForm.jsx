import React, { Component } from "react";

import Input from "./common/input";

class LoginForm extends Component {
  state = {
    account: { username: "", password: "" },
    errors: {}
  };
  // 2. Creating a ref object
  username = React.createRef();

  validate = () => {
    const errors = {};

    const { account } = this.state;

    // for each input field we write validation logic
    if (account.username.trim() === "")
      errors.username = "Username is required.";

    if (account.password.trim() === "")
      errors.password = "Password is required.";

    return Object.keys(errors).length === 0 ? null : errors;
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

  handleChange = ({ currentTarget: input }) => {
    // we use the spread opperator to clone the account object from the state
    const account = { ...this.state.account };

    account[input.name] = input.value;

    this.setState({ account });
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
