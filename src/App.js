// IMPORT 3RD PARTY LIBRARIES
import React, { Component } from "react";
import Movies from "./components/movies";
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
import ProtectedRoute from "./components/common/protectedRoute";
// IMPORT CSS FILES
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import authService from "./services/authService";
import MovieForm from "./components/movieForm";

class App extends Component {
  state = {};

  componentDidMount() {
    // 1. get current user
    const user = authService.getCurrentUser();

    // 2. update the state
    this.setState({ user });
  }

  render() {
    const { user } = this.state;

    return (
      <React.Fragment>
        <NavBar user={this.state.user}></NavBar>
        <main className="container">
          <Switch>
            <Route path="/login" component={LoginForm}></Route>
            <Route path="/logout" component={Logout}></Route>
            <Route path="/register" component={RegisterForm}></Route>
            <Redirect from="/home" to="/movies"></Redirect>
            <ProtectedRoute
              path="/movies/:movieId"
              component={MovieForm}
            ></ProtectedRoute>
            {/** re place component with render (to that we can pass user object to the child component) and pass a function */}
            {/** we need to pass all other props {...props} which contains all objects which react automatically injects when using
           routing. For example, history, match, location, etc. In addition to that pro, we pass the user prop*/}
            <Route
              path="/movies"
              render={props => <Movies {...props} user={user} />}
            ></Route>
            <Route path="/customers" component={Customers}></Route>
            <Route path="/rentals" component={Rentals}></Route>

            <Route path="/not-found" component={NotFound}></Route>

            <Redirect from="/" to="/movies"></Redirect>
            <Redirect to="/not-found"></Redirect>
          </Switch>
          <></>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
