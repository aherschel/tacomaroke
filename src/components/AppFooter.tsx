import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { FaGithub } from "react-icons/fa";

const AppFooter = () => {
  return (
    <Navbar className="fixed-bottom" bg="dark" variant="dark">
      <Container>
        <Nav>
          <Nav.Link href="https://github.com/aherschel/tacomaroke">
            View Source <FaGithub />
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default AppFooter;
