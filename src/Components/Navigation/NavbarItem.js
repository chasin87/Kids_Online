import React from "react";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";

export default function NavbarItem(props) {
  return (
    <Nav.Item>
      <Nav.Link
        style={{ color: "black", fontWeight: 400, fontSize: 22 }}
        as={NavLink}
        to={props.path}
      >
        {props.linkText}
      </Nav.Link>
    </Nav.Item>
  );
}
