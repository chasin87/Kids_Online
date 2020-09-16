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
          <a href="contacts.html"> info@kidsonline.nl</a>
        </div>
        <div className="login_area">
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
          </ul>
        </div>
      </div>

      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <Navbar.Brand className="Title" bg="red" href="/">
          Kids Online
          <p className="subTitle">Online school for our children</p>
        </Navbar.Brand>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav">
            <a class="nav-item nav-link active" href="/">
              Home <span class="sr-only">(current)</span>
            </a>
            <a class="nav-item nav-link" href="Kleuren">
              Colors
            </a>
            <a class="nav-item nav-link" href="TicTacToe">
              TicTacToe
            </a>
            <a class="nav-item nav-link" href="Memory">
              Memory
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
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navigation;
