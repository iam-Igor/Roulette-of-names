import { Container, NavDropdown, Navbar } from "react-bootstrap";
import { useDispatch } from "react-redux";

const NavbarCustom = () => {
  const dispatch = useDispatch();

  const changeDarkMode = (param) => {
    if (param === "dark") {
      dispatch({ type: "ENABLE_DARK_MODE", payload: true });
    } else {
      dispatch({ type: "ENABLE_DARK_MODE", payload: false });
    }
  };

  return (
    <Navbar expand="lg" bg="primary" className="text-white shadow-btm">
      <Container>
        <Navbar.Brand className="pop-up-text">Roulette of names</Navbar.Brand>
        <NavDropdown
          title={<i className="bi bi-gear-wide-connected"></i>}
          id="basic-nav-dropdown"
          className="me-auto"
        >
          <NavDropdown.Item
            onClick={() => {
              changeDarkMode("light");
            }}
          >
            Light <i className="bi bi-lightbulb"></i>
          </NavDropdown.Item>
          <NavDropdown.Item
            onClick={() => {
              changeDarkMode("dark");
            }}
          >
            Dark <i className="bi bi-lightbulb-off"></i>
          </NavDropdown.Item>
        </NavDropdown>
      </Container>
    </Navbar>
  );
};

export { NavbarCustom };
