import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import Movies from "./components/movies";
import NavBar from "./components/navbar";
import { Route, Switch, Redirect } from "react-router-dom";
import NotFound from "./components/common/notfound";
import Customers from "./components/customers";
import Rentals from "./components/rentals";

function App() {
  return (
    <React.Fragment>
      <NavBar></NavBar>
      <main className="container">
        <Switch>
          <Route path="/home" exact component={Movies}></Route>
          <Route path="/customers" exact component={Customers}></Route>
          <Route path="/rentals" exact component={Rentals}></Route>
          <Route path="/not-found" component={NotFound}></Route>
          <Route path="/" exact component={Movies}></Route>
          <Redirect to="/not-found"></Redirect>
        </Switch>
        <></>
      </main>
    </React.Fragment>
  );
}

export default App;
