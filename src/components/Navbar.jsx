import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import "./Navbar.css";

const AppNavbar = () => {
  return (
    <Navbar expand="lg" bg="dark" variant="dark" sticky="top" className="shadow-sm">
      <Container>
        {/* Brand Logo / Title */}
        <Navbar.Brand href="/" className="fw-bold fs-4 text-uppercase">
          Dashboard<span className="text-primary">Hub</span>
        </Navbar.Brand>

        {/* Toggle Button for Mobile */}
        <Navbar.Toggle aria-controls="navbar-nav" />

        {/* Navbar Links */}
        <Navbar.Collapse id="navbar-nav">
          <Nav className="mx-auto text-center">
            <Nav.Link href="/students" className="mx-2 fw-semibold">
              Student Performance
            </Nav.Link>
            
            <Nav.Link href="/portfolio" className="mx-2 fw-semibold">
              Portfolio
            </Nav.Link>
            <Nav.Link href="/business" className="mx-2 fw-semibold">
              Business Analytics
            </Nav.Link>
            <Nav.Link href="/admin" className="mx-2 fw-semibold">
              Admin Panel
            </Nav.Link>
          </Nav>

          {/* Right Side Buttons */}
          <div className="d-flex justify-content-center">
            <Button variant="outline-light" size="sm" className="me-2">
              Login
            </Button>
            <Button variant="primary" size="sm">
              Sign Up
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
