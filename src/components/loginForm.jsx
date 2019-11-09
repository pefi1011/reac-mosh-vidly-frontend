import React, { Component } from "react";

class LoginForm extends Component {
  state = {};
  // 2. Creating a ref object
  username = React.createRef();

  componentDidMount() {
    // when our component is mounted, I want the username field to get the focus!
    this.username.current.focus();
  }

  handleSubmit = e => {
    // In this case, prevents submitting
    // the form to the server which causes the full page reload
    e.preventDefault();

    // Call the server

    // In Vanilla JS we will get the value of an input field like this
    // AND THIS IS HOW YOU DO NOT DO IT IN REACT!
    // IN REACT, YOU NEVER WORK WITH A DOCUMENT OBJECT
    // THE WHOLE POINT OF REACT IS TO PUT AN ABSTRACTION OVER
    // THE DOCUMENT OBJECT (MODEL), i.e. OVER DOM
    // const username = document.getElementById("username").value;

    // 1. To get access to a username element, we have to give it a reference
    // See steps 2 and 3
    // 4. Access the DOM element via REF
    // this.username.current returns the DOM element, and then we access the value property
    // THIS IS THE WAY TO ACCESS THE DOM ELEMENTS, BUT WHEN BUILDING FORMS
    // THERE IS A BETTER WAY WHICH WE WILL TAKE A LOOK LATER
    // RULE OF THUMB: MINIMIZE THE USAGE OF REFS!!!
    // Use it only when you know what are you doing!
    // E.g. sometimes you want to manage the focus of a input field, so you want to get the reference to that DOM element
    // E.g. you want to work with animations or 3rd party DOM libraries
    const username = this.username.current.value;

    console.log("username: ", username);

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
            {/** 3. NOW WE ASSIGN THE REF OBEJCT TO THE INPUT FIELD VIA REF ATTRIBUTE */}
            <input
              ref={this.username}
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
