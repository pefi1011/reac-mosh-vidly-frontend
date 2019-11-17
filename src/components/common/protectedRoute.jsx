import React from "react";
import { Route, Redirect } from "react-router-dom";
import authService from "../../services/authService";

// destructuring props object into path, component, and render
// the props object can have more properties than path, component, render
// so using the rest operator, we can pick other properties
const ProtectedRoute = ({ path, component: Component, render, ...rest }) => {
  return (
    <Route
      // We can remove path={path} bc that will be picked by {...rest}
      //  path={path}
      {...rest}
      render={props => {
        if (!authService.getCurrentUser()) return <Redirect to="/login" />;

        // If component is truthy, we return it
        // otherwise, we return the render function
        return Component ? <Component {...props} /> : render(props);
      }}
    ></Route>
  );
};

export default ProtectedRoute;
