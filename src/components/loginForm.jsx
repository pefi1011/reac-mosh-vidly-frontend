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

  // Instead of passing the e object (event)
  // and then withtin the method writing e.currentTarget.name and e.currentTarget.value
  // we can DOB it in the params immedielty, i.e. extract the currentTarget from the event
  // then we rename the currentTarget to input
  handleChange = ({ currentTarget: input }) => {
    // we use the spread opperator to clone the account object from the state
    const account = { ...this.state.account };

    // we do not want to have a handler for passowrd property, we want to set
    // a property of the object dynamically -> work with bracket notation instesad of . notation
    // We have our input fields a name property and based on it we access it
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
          <div className="form-group">
            <label htmlFor="username">Username</label>
            {/** Convert the input component to a controlled component. Controlled component do not have their own state,
            they get all their data via props and they notify changes on the data by raising events 
            add "value" attribute and onChange event
            */}
            <input
              value={account.username}
              onChange={this.handleChange}
              autoFocus
              name="username"
              id="username"
              type="text"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              value={account.password}
              onChange={this.handleChange}
              name="password"
              id="password"
              type="text"
              className="form-control"
            />
          </div>
          <button className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
