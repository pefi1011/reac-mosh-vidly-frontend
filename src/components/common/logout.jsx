import React, { Component } from "react";
import authService from "../../services/authService";

class Logout extends Component {
  componentDidMount() {
    authService.logout();
    window.location = "/";
  }
  render() {
    // we do not want to render anything
    return null;
  }
}

export default Logout;
