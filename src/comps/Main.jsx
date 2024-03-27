import { useEffect, useRef, useState } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { Cell, Pie, PieChart } from "recharts";
import { motion } from "framer-motion";
import ConfettiExplosion from "react-confetti-explosion";

const Main = () => {
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [nameAdded, setNameAdded] = useState("");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const [isExploding, setIsExploding] = useState(false);

  const [showAdvanced, setShowAdvanced] = useState(false);

  const [winner, setWinner] = useState({ name: "", index: 0, color: "" });
  const [show, setShow] = useState(false);

  const [color, setColor] = useState("");

  const [modalText, setModaltext] = useState(false);

  const chartRef = useRef(null);

  const [data, setData] = useState([
    { name: "Mattew", value: 10 },
    { name: "Simon", value: 10 },
    { name: "Mark", value: 10 },
  ]);

  const removeItemAtIndex = (indexToRemove) => {
    setData((prevData) =>
      prevData.filter((_, index) => index !== indexToRemove)
    );
  };

  const COLORS = [
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
    "#46FF38",
    "#383CFF",
    "#FF9238",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    let option;

    if (showAdvanced && color != "") {
      option = {
        name: nameAdded,
        value: 10,
        color: color,
      };
    } else {
      option = {
        name: nameAdded,
        value: 10,
      };
    }

    console.log(option, showAdvanced);

    setData([...data, option]);
  };

  const getBrightness = (param) => {
    if (!param) {
      let hexColor = winner.color.substring(1);

      // Calcola la luminosità
      let r = parseInt(hexColor.substring(0, 2), 16);
      let g = parseInt(hexColor.substring(2, 4), 16);
      let b = parseInt(hexColor.substring(4, 6), 16);
      let brightness = (r * 299 + g * 587 + b * 114) / 1000;

      if (brightness > 125) {
        setModaltext(true);
      } else {
        setModaltext(false);
      }
    } else {
      let hexColor = param.substring(1);
      let r = parseInt(hexColor.substring(0, 2), 16);
      let g = parseInt(hexColor.substring(2, 4), 16);
      let b = parseInt(hexColor.substring(4, 6), 16);
      let brightness = (r * 299 + g * 587 + b * 114) / 1000;

      if (brightness > 125) {
        return "black";
      } else {
        return "white";
      }
    }
  };

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    // eslint-disable-next-line no-unused-vars
    value,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill={data[index].color ? getBrightness(data[index].color) : "black"}
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {data[index].name}
      </text>
    );
  };

  const updateDatas = (e, index) => {
    const newData = [...data];
    newData[index].name = e.target.value;
    setData(newData);
  };
  const startAnimation = () => {
    const minRotationAngle = -1020;
    const randomAngle = Math.floor(Math.random() * minRotationAngle);
    const initialOffset = 360 * Math.floor(Math.random() * 10); // Calcola un grado di partenza casuale
    const finalAngle = initialOffset + minRotationAngle + randomAngle; // Aggiungi l'offset all'angolo casuale
    setRotationAngle(finalAngle);
    setIsAnimating(true);

    setTimeout(() => {
      setIsAnimating(false);
      handleArrowClick();
    }, 6000);
  };
  const calculateDistance = (x1, y1, x2, y2) => {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
  };
  const handleArrowClick = () => {
    const arrowRect = chartRef.current.getBoundingClientRect();
    const chartElements = document.querySelectorAll(".pie-slice");

    const arrowCx = arrowRect.left + arrowRect.width / 2;
    const arrowCy = arrowRect.top + arrowRect.height / 2;

    let closestElement = null;
    let minDistance = Number.MAX_SAFE_INTEGER;

    chartElements.forEach((element, index) => {
      const elementRect = element.getBoundingClientRect();
      const elementCx = elementRect.left + elementRect.width / 2;
      const elementCy = elementRect.top + elementRect.height / 2;

      const distance = calculateDistance(
        arrowCx,
        arrowCy,
        elementCx,
        elementCy
      );

      if (distance < minDistance) {
        minDistance = distance;
        closestElement = data[index].name;
        setWinner({
          name: closestElement,
          index: index,
          color: chartElements[index].getAttribute("fill"),
        });
        getBrightness();
        setIsExploding(true);
        setTimeout(() => {
          setIsExploding(false);
        }, 4000);
      }
    });

    setShow(true);
  };

  const randomizeArray = () => {
    const newArray = [...data];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    setData(newArray);
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Container className="mb-5">
      {isExploding && (
        <ConfettiExplosion width={10000} duration={3000} particleCount={200} />
      )}

      <Row className="d-flex flex-column flex-md-row mt-5 main-row ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="60"
          height="60"
          fill="currentColor"
          className="bi bi-caret-right-fill pointer-icon"
          viewBox="0 0 16 16"
        >
          <path
            ref={chartRef}
            d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"
          />
        </svg>
        <Col className="col-12 col-md-8 d-flex flex-column align-items-center wheel-col">
          <motion.div
            id="animated-div"
            animate={
              isAnimating
                ? { rotate: rotationAngle }
                : { rotate: rotationAngle }
            }
            transition={{
              duration: 5,
              ease: [0.1, 0.685, 0.32, 1],
            }}
          >
            <PieChart
              width={windowWidth <= 480 ? 300 : 600}
              height={windowWidth <= 480 ? 300 : 600}
              className="pie-chart"
              id="pie-chart"
            >
              <Pie
                animationDuration={0}
                className="wheel-col"
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={windowWidth <= 480 ? 30 : 60}
                outerRadius={windowWidth <= 480 ? 150 : 300}
                fill="#8884d8"
                dataKey="value"
                labelLine={false}
                label={renderCustomizedLabel}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    className="pie-slice"
                    fill={
                      data[index].color
                        ? data[index].color
                        : COLORS[index % COLORS.length]
                    }
                  />
                ))}
              </Pie>
            </PieChart>
          </motion.div>
        </Col>

        <Col className="col-12 col-md-4 border border-start p-3 rounded-4 shadow-btm mt-3 mt-md-0">
          <div className="d-flex justify-content-around">
            <h2>Spin the wheel</h2>
            <Button
              disabled={isAnimating ? true : false}
              className="btn-start rounded-circle btn-warning"
              onClick={startAnimation}
            >
              <i className="bi bi-arrow-repeat fs-4"></i>
            </Button>
          </div>
          <hr></hr>
          <h4>Add your entries here</h4>
          <Form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <Form.Control
              required
              type="text"
              placeholder="Type something.."
              onChange={(e) => {
                setNameAdded(e.target.value);
              }}
            />
            <hr></hr>
            <div className="mt-3 d-flex flex-column justify-content-center">
              <p>Advanced</p>
              <Form.Check
                type="switch"
                value={showAdvanced}
                id="custom-switch"
                label={showAdvanced ? "Custom color" : "Random color"}
                onChange={(e) => {
                  setShowAdvanced(e.target.checked);
                }}
              />
              {showAdvanced && (
                <div className="d-flex align-items-center mt-2">
                  <Form.Control
                    type="color"
                    id="exampleColorInput"
                    defaultValue="#563d7c"
                    title="Choose your color"
                    onChange={(e) => {
                      setColor(e.target.value);
                    }}
                  />
                  <p className="m-0 ms-2">Pick a color</p>
                </div>
              )}
            </div>
            <hr></hr>
            <Button className="mt-3 rounded-4 btn-success" type="submit">
              Enter
            </Button>
          </Form>
          <h4 className="mt-5">Or edit existing ones</h4>
          <div className="mb-4 mb-md-3">
            <Button
              className="btn-secondary fs-5 rounded-4 px-4 py-1"
              onClick={randomizeArray}
            >
              <i className="bi bi-shuffle"></i>
            </Button>
          </div>
          <Form className="overflow-y-scroll names-form p-3 rounded-4 shadow-inside">
            {data.map((entry, index) => {
              return (
                <div key={"form" + index} className="d-flex align-items-center">
                  <Form.Control
                    className="my-3"
                    value={data[index].name}
                    type="text"
                    onChange={(e) => {
                      updateDatas(e, index);
                    }}
                  />
                  <Button
                    className="ms-1 btn-danger"
                    onClick={() => {
                      removeItemAtIndex(index);
                    }}
                  >
                    X
                  </Button>
                </div>
              );
            })}
          </Form>
        </Col>
      </Row>
      <Modal
        style={{ border: 0 }}
        show={show}
        size="lg"
        centered
        onHide={() => {
          setShow(false);
        }}
      >
        <Modal.Header closeButton style={{ backgroundColor: winner.color }}>
          <Modal.Title className={!modalText ? "text-black" : "text-white"}>
            And the winner is...
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>{winner.name}</h4>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn-danger rounded-4"
            onClick={() => {
              removeItemAtIndex(winner.index);
              setShow(false);
            }}
          >
            Remove
          </Button>
          <Button
            className="rounded-4"
            onClick={() => {
              setShow(false);
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export { Main };
