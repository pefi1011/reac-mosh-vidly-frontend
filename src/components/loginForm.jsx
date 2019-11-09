import React, { Component } from "react";

class LoginForm extends Component {
  state = {};

  handleSubmit = e => {
    // In this case, prevents submitting
    // the form to the server which causes the full page reload
    e.preventDefault();

    // Call the server
    console.log("Form submitted");
    // Save the changes
    // Redirect the user
  };

  render() {
    return (
      <div>
        <h1>Login</h1>
        {/** BY DEFAULT HTML FORM MAKE A FULL ROUND-TRIP TO THE SERVER
        i.e. THE WHOLE PAGE GET RELOADED!!! THAT'S NOT WHAT WE WANT 
        THEREFORE WE OVERRIDE THE onSubmit event!
        */}
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input id="username" type="text" className="form-control" />
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
