import React, { Component } from "react";

class Logout extends Component {
  componentDidMount() {
    localStorage.removeItem("token");
    window.location = "/";
  }
  render() {
    // we do not want to render anything
    return null;
  }
}

export default Logout;
