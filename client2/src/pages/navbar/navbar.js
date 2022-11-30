// import Manager from "./pages/manager/manager.js";
// import Cashier from "./pages/cashier/cashier.js";
import React from 'react';
import "./navbar.css"
const Navbar = () => {
    return (

      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand text-large" href="/">
          Customer
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
  
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a className="nav-link text-large" href="http://localhost:3000/manager">
                Manager
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white text-large" href="http://localhost:3000/cashier">
                Cashier 
              </a>
            </li>
            {/* <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdownMenuLink"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Dropdown link
              </a>
              <div
                className="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <a className="dropdown-item" href="#">
                  Action
                </a>
                <a className="dropdown-item" href="#">
                  Another action
                </a>
                <a className="dropdown-item" href="#">
                  Something else here
                </a>
              </div>
            </li> */}
          </ul>
        </div>
      </nav>
    );
  };
  
  export default Navbar;