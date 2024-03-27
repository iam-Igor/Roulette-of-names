import { Container, Navbar } from "react-bootstrap";

const NavbarCustom = () => {
  return (
    <Navbar expand="lg" bg="primary" className="shadow-btm">
      <Container>
        <Navbar.Brand href="#home" className="text-white">
          Roulette of names
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export { NavbarCustom };
