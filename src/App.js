// IMPORT 3RD PARTY LIBRARIES
import React, { Component } from "react";
import Movies from "./components/movies";
import jwtDecode from "jwt-decode";
// IMPORT OUR OWN COMPONENTS
import NavBar from "./components/navbar";
import { Route, Switch, Redirect } from "react-router-dom";
import NotFound from "./components/common/notfound";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import MovieForm from "./components/movieForm";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import Logout from "./components/common/logout";
// IMPORT CSS FILES
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";

class App extends Component {
  state = {};

  componentDidMount() {
    // 1. get the JWT from the local storage
    // 2. decode JWT to get the current user
    // 3. update the state

    try {
      // 1. get the JWT from the local storage
      const jwt = localStorage.getItem("token");
      // 2. decode JWT to get the current user (using npm i jwt-decode@2.2.0)
      const user = jwtDecode(jwt);
      // 3. update the state
      this.setState({ user });
    } catch (ex) {
      // The case when we do not have a valid JWT in the local storage -> anonymous user
      // so we can just ignore this because its technically error
    }
  }

  render() {
    return (
      <React.Fragment>
        <NavBar user={this.state.user}></NavBar>
        <main className="container">
          <Switch>
            <Route path="/login" component={LoginForm}></Route>
            <Route path="/logout" component={Logout}></Route>
            <Route path="/register" component={RegisterForm}></Route>
            <Redirect from="/home" to="/movies"></Redirect>
            <Route path="/movies/:movieId" component={MovieForm}></Route>
            <Route path="/movies" exact component={Movies}></Route>
            <Route path="/customers" component={Customers}></Route>
            <Route path="/rentals" component={Rentals}></Route>

            <Route path="/not-found" component={NotFound}></Route>
            <Route path="/" exact component={Movies}></Route>

            <Redirect to="/not-found"></Redirect>
          </Switch>
          <></>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
