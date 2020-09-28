import React from "react";
import "./index.css";
// Bootstrap imports
import { Navbar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
//images
import lock from "../../Images/lock.png";
import reg from "../../Images/reg.png";

function Navigation() {
  return (
    <header>
      <div className="top-bar">
        <div className="information_area">
          Contact us on 012345678 or
          <a href="contacts"> info@kidsonline.nl</a>
        </div>
        <div className="login_area">
          <ul>
            <li>
              <a className="register" href="contacts">
                <img className="icon_reg" src={reg} alt="Lock" />
                Register
              </a>
            </li>
            <li>
              <a className="login" href="login">
                <img className="icon_lock" src={lock} alt="Lock" />
                Login
              </a>
            </li>
            <li>
              <a className="admin" href="admin">
                <img className="icon_lock" src={lock} alt="Lock" />
                Admin
              </a>
            </li>
          </ul>
        </div>
      </div>

      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Navbar.Brand className="Title" bg="red" href="/">
          Kids Online
          <p className="subTitle">Online school for our children</p>
        </Navbar.Brand>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <a className="nav-item nav-link active" href="/">
              Home <span className="sr-only">(current)</span>
            </a>
            <a className="nav-item nav-link" href="Kleuren">
              Colors
            </a>
            <a className="nav-item nav-link" href="TicTacToe">
              TicTacToe
            </a>
            <a className="nav-item nav-link" href="Memory">
              Memory
            </a>
            <a className="nav-item nav-link" href="Quiz">
              Quiz
            </a>
          </div>
          <div className="login_area_nav">
            <ul>
              <li>
                <a className="register" href="contacts.html">
                  <img className="icon_reg" src={reg} alt="Lock" />
                  Register
                </a>
              </li>
              <li>
                <a className="login" href="login.html">
                  <img className="icon_lock" src={lock} alt="Lock" />
                  Login
                </a>
              </li>
              <li>
                <a className="admin" href="admin.html">
                  <img className="icon_lock" src={lock} alt="Lock" />
                  Admin
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navigation;
