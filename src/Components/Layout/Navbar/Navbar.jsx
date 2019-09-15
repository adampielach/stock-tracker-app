import React from "react";
import { NavLink } from "react-router-dom";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

const NavbarWrapper = () => {
  return (
    <div className="stock-tracker--navbar">
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">Stock Tracker</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto" as="ul">
            <Nav.Link as={NavLink} to="/companies" activeClassName="active">
              Companies
            </Nav.Link>
            <Nav.Link as={NavLink} to="/add" activeClassName="active">
              Add New Company
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default NavbarWrapper;
