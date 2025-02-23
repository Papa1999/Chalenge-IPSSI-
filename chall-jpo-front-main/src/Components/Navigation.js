import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { LinkContainer } from "react-router-bootstrap";
import pokemon from "../img/logo.png";
import "../style/navigation.css";
import { useEffect } from "react";

function Navigation() {
  useEffect(() => {
    localStorage.setItem("caretaking", "XBDk");
  }, []);
  return (
    <>
      <Navbar className="red" expand="lg">
        <Container>
          <Navbar.Brand href="/">
            <img src={pokemon} alt="logo" height="100" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <LinkContainer to="/">
                <Nav.Link className="white">
                  <span className="white">Liste Pokémons</span>
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/MonPokedex">
                <Nav.Link className="white">
                  <span className="white">Mon pokédex</span>
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Navigation;
