import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { FaGithub, FaChevronLeft } from "react-icons/fa";

const AppFooter = () => {
  return (
    <Navbar className="fixed-bottom" bg="dark" variant="dark">
      <Container>
        <Nav>
          <Nav.Link href="https://dempseytools.com">
            <FaChevronLeft /> Visit Dempsey Tools
          </Nav.Link>
          <Nav.Link href="https://github.com/aherschel/tacomaroke">
            <FaGithub /> View Source
          </Nav.Link>
          <Nav.Link href="https://www.buymeacoffee.com/aherschel">
            <img alt="buy me a coffee link" src="/bmc_icon.png" width="137px" height="30px" />
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default AppFooter;
