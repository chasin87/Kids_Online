import React from "react";
import "./index.css";
// Bootstrap imports
import { Navbar, Nav } from "react-bootstrap";
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

      <Navbar className="Navbar" bg="red" variant="dark">
        <Navbar.Brand className="Title" bg="red" href="/">
          Kids Online
          <p className="subTitle">Online school for our children</p>
        </Navbar.Brand>

        <Nav className="mr-auto">
          <Nav.Link className="Links" href="/">
            Home
          </Nav.Link>
          <Nav.Link className="Links" href="Kleuren">
            Leer de Kleuren
          </Nav.Link>
          <Nav.Link className="Links" href="#pricing">
            Pricing
          </Nav.Link>
        </Nav>
      </Navbar>
    </header>
  );
}

export default Navigation;
