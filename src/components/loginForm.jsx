import React, { Component } from "react";

import Input from "./common/input";

class LoginForm extends Component {
  state = {
    account: { username: "", password: "" },
    erros: {}
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
      errors.username = "Password is required.";

    return Object.keys(errors).length === 0 ? null : errors;
  };

  handleSubmit = e => {
    e.preventDefault();

    const erros = this.validate();
    // we change the state and let react rerender the view and show errors
    this.setState({ erros });

    // if there are any errors, we return, i.e. we abort the form submition. We do not call the server
    if (erros) return;

    const username = this.username.current.value;

    console.log("username: ", username);

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
    const { account } = this.state;

    return (
      <div>
        <h1>Login</h1>

        <form onSubmit={this.handleSubmit}>
          <Input
            name="username"
            value={account.username}
            label="Username"
            onChange={this.handleChange}
          />

          <Input
            name="password"
            value={account.password}
            label="Password"
            onChange={this.handleChange}
          />

          <button className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
