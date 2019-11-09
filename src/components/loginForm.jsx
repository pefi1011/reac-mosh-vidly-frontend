import React, { Component } from "react";

class LoginForm extends Component {
  state = {
    account: { username: "", password: "" }
  };
  // 2. Creating a ref object
  username = React.createRef();

  handleSubmit = e => {
    e.preventDefault();

    const username = this.username.current.value;

    console.log("username: ", username);

    console.log("Form submitted");
    // Save the changes
    // Redirect the user
  };

  handleChange = e => {
    // we use the spread opperator to clone the account object from the state
    const account = { ...this.state.account };

    // even.currentTarget returns the element and .value returns the value in the field
    account.username = e.currentTarget.value;

    this.setState({ account });
  };

  render() {
    return (
      <div>
        <h1>Login</h1>

        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            {/** Convert the input component to a controlled component. Controlled component do not have their own state,
            they get all their data via props and they notify changes on the data by raising events 
            add "value" attribute and onChange event
            */}
            <input
              value={this.state.account.username}
              onChange={this.handleChange}
              autoFocus
              id="username"
              type="text"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input id="password" type="text" className="form-control" />
          </div>
          <button className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
