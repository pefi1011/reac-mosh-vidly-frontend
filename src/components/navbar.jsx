import React from "react";
import { NavLink, Link } from "react-router-dom";

// using DOB on props to extract the "user"
const NavBar = ({ user }) => {
  return (
    <React.Fragment>
      <nav
        className="navbar navbar-expand-lg navbar-light bg-light"
        style={{ marginBottom: "20px", marginTop: "0px" }}
      >
        <Link className="nav-link" to="/">
          Vidly <span className="sr-only">(current)</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo02"
          aria-controls="navbarTogglerDemo02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="nav-item active">
              <NavLink className="nav-item nav-link" to="/movies">
                Movies <span className="sr-only">(current)</span>
              </NavLink>
            </li>
            <li className="nav-item active">
              <NavLink className="nav-link" to="/customers">
                Customers <span className="sr-only">(current)</span>
              </NavLink>
            </li>
            <li className="nav-item active">
              <NavLink className="nav-link" to="/rentals">
                Rentals <span className="sr-only">(current)</span>
              </NavLink>
            </li>
            {/** CONDITIONALLY RENDERING LOGIN AND REGISTER
            IF USER OBJECT DOES NOT EXIST, THEN ITS RENDERED */}
            {!user && (
              <React.Fragment>
                <li className="nav-item active">
                  <NavLink className="nav-link" to="/login">
                    Login
                  </NavLink>
                </li>
                <li className="nav-item active">
                  <NavLink className="nav-link" to="/register">
                    Register
                  </NavLink>
                </li>
              </React.Fragment>
            )}

            {/** IF WE HAVE A USER, WE WANT TO LOG USERS NAME */}
            {user && (
              <React.Fragment>
                <li className="nav-item active">
                  <NavLink className="nav-link" to="/profile">
                    {user.name}
                  </NavLink>
                </li>
                <li className="nav-item active">
                  <NavLink className="nav-link" to="/logout">
                    Logout
                  </NavLink>
                </li>
              </React.Fragment>
            )}
          </ul>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default NavBar;
