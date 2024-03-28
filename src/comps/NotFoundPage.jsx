import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Row>
        <Col className="d-flex flex-column align-items-center justify-content-center py-5">
          <i className="bi bi-emoji-frown" style={{ fontSize: "8em" }}></i>
          <h1>404-Oops! Page not found!</h1>
          <Button
            className="rounded-4"
            onClick={() => {
              navigate("/");
            }}
          >
            Back to home
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export { NotFoundPage };
