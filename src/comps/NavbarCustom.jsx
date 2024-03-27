import { Container, Navbar } from "react-bootstrap";

const NavbarCustom = () => {
  return (
    <Navbar expand="lg" bg="primary" className="shadow-btm">
      <Container>
        <Navbar.Brand href="#home" className="text-white pop-up-text">
          Roulette of names
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export { NavbarCustom };
