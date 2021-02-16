import React from "react";
import { Link } from "react-router-dom";
import { Auth } from "aws-amplify";
import { Navbar, Nav, Button } from "react-bootstrap";
import { isAuthEnabled, isDebugEnabled, isGroupPlayEnabled } from "../FeatureFlags";

const signOut = async () => {
  await Auth.signOut();
};

/**
 * Component responsible for rendering the nav bar on all app pages.
 */
const AppHeader = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="md">
      <Navbar.Brand>Tacomaroke</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbar" />
      <Navbar.Collapse id="navbar">
        <Nav className="mr-auto">
          {isGroupPlayEnabled() && (
            <>
              <Link className="nav-link" to="/song">
                Solo Mode
              </Link>
              <Link className="nav-link" to="/">
                Party Mode
              </Link>
            </>
          )}
          {!isGroupPlayEnabled() && (
            <Link className="nav-link" to="/song">
              Song Picker
            </Link>
          )}
          <Link className="nav-link" to="/about">
            About
          </Link>
          <Link className="nav-link" to="/services">
            Services
          </Link>
          {isDebugEnabled() && (
            <Link className="nav-link" to="/debug">
              Debug Pages
            </Link>
          )}
        </Nav>
        {isAuthEnabled() && (
          <Button variant="outline-light" onClick={signOut}>
            SignOut
          </Button>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default AppHeader;
