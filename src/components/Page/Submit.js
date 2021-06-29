import React, { useState } from "react";
import {
  Button,
  Form,
  Container,
  Row,
  Col,
  Image,
  Range,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import { withStyles } from "@material-ui/core/styles";
const Submit = (props) => {
  // 아이디 전달
  const [validated, setValidated] = useState(false);
  // const [userNicName, setUserNicName] = useState("");
  // const [userUniv, setUserUniv] = useState("");
  // const [userAge, setUserAge] = useState("");
  // const [userSex, setUserSex] = useState("");

  // 유효성 검사
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  // userAge Slider
  const useStyles = makeStyles((theme) => ({
    root: {
      width: 300,
    },
    margin: {
      height: theme.spacing(3),
    },
  }));

  const marks = [
    {
      value: 20,
      label: "20살",
    },
    {
      value: 23,
      label: "23살",
    },
    {
      value: 27,
      label: "27살",
    },
    {
      value: 30,
      label: "30살",
    },
  ];

  function valuetext(value) {
    return `${value}°C`;
  }

  const classes = useStyles();

  // arbnb slider
  const useStylesAirBnb = makeStyles((theme) => ({
    root: {
      width: 300 + theme.spacing(3) * 2,
    },
    margin: {
      height: theme.spacing(3),
    },
  }));

  const AirbnbSlider = withStyles({
    root: {
      color: "#3a8589",
      height: 3,
      padding: "13px 0",
    },
    thumb: {
      height: 27,
      width: 27,
      backgroundColor: "#fff",
      border: "1px solid currentColor",
      marginTop: -12,
      marginLeft: -13,
      boxShadow: "#ebebeb 0 2px 2px",
      "&:focus, &:hover, &$active": {
        boxShadow: "#ccc 0 2px 3px 1px",
      },
      "& .bar": {
        // display: inline-block !important;
        height: 9,
        width: 1,
        backgroundColor: "currentColor",
        marginLeft: 1,
        marginRight: 1,
      },
    },
    active: {},
    track: {
      height: 3,
    },
    rail: {
      color: "#d8d8d8",
      opacity: 1,
      height: 3,
    },
  })(Slider);

  function AirbnbThumbComponent(props) {
    return (
      <span {...props}>
        <span className="bar" />
        <span className="bar" />
        <span className="bar" />
      </span>
    );
  }
  return (
    <div>
      <Container fluid="md">
        <Row className="text-center">
          <h1>참가신청서</h1>
        </Row>
        <Row>
          <Col></Col>
          <Col>
            <Image src="Image/Logo.png" rounded fluid />
          </Col>
          <Col></Col>
        </Row>

        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="userNicName">
            <Form.Label>닉네임을 설정해주세요!</Form.Label>
            <Form.Control type="text" placeholder="닉네임" required />
            <Form.Control.Feedback type="invalid">
              닉네임을 입력하세요
            </Form.Control.Feedback>
            <Container>
              <Row>
                <Form.Text className="text-muted">
                  - 부적절한 닉네임 설정시 신청이 취소됩니다.
                </Form.Text>
              </Row>
              <Row>
                <Form.Text className="text-muted">
                  - 부적절한 닉네임 설정시 신청이 취소됩니다.
                </Form.Text>
              </Row>
              <Row>
                <Form.Text className="text-muted">
                  - 부적절한 닉네임 설정시 신청이 취소됩니다.
                </Form.Text>
              </Row>
            </Container>
          </Form.Group>

          <Form.Group controlId="userAge" className="md-3" fluid>
            <div className={classes.root}>
              <Typography id="discrete-slider-custom" gutterBottom>
                나이를 선택해주세요
              </Typography>
              <Slider
                min={20}
                max={30}
                defaultValue={20}
                getAriaValueText={valuetext}
                aria-labelledby="discrete-slider-always"
                step={1}
                valueLabelDisplay="auto"
                marks={marks}
              />
            </div>
          </Form.Group>

          <Form.Group>
            <Form.Label>상대방의 나이</Form.Label>
            <Form.Control
              type="range"
              placeholder="닉네임"
              required
              min={20}
              max={30}
              defaultValue={[21, 29]}
            />
          </Form.Group>
          <AirbnbSlider
            ThumbComponent={AirbnbThumbComponent}
            getAriaLabel={(index) =>
              index === 0 ? "Minimum price" : "Maximum price"
            }
            defaultValue={[20, 40]}
          />
          <Form.Group controlId="finalBtn">
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form.Group>
        </Form>
      </Container>
    </div>
  );
};

export default Submit;
