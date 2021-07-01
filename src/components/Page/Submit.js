import React, { useState } from "react";

import { Button, Form, Container, Row, Col, Image } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css"; // or include from a CDN
import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";
import RangeSlider from "react-bootstrap-range-slider";
import { Slider } from "@material-ui/core";
import NickName from "./SubmitComponents/NicName";
import UserAge from "./SubmitComponents/UserAge";
import MatchingType from "./SubmitComponents/MatchingType";
import OtherRange from "./SubmitComponents/OtherRange";
import Ticket from "./SubmitComponents/Ticket";
//aa
const Submit = () => {
  // 아이디 전달
  const [validated, setValidated] = useState(false);

  // submit 유효성 검사
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };

  // 체크박스 toggle
  const [lilacVisible, setLilacVisible] = useState(true);
  const [daisyVisible, setDaisyVisible] = useState(true);
  const [daisyGayVisible, setDaisyGayVisible] = useState(true);

  const handleLilacVisible = (event) => {
    setLilacVisible(!lilacVisible);
  };
  const handleDaisyVisible = (event) => {
    setDaisyVisible(!daisyVisible);
  };
  const handleDaisyGayVisible = (event) => {
    setDaisyGayVisible(!daisyGayVisible);
  };

  // user age range
  const [userAge, setUserAge] = useState(20);
  // other lilac age
  const [lilacAgeValue, setLilacAgeValue] = useState([20, 29]);
  const updateLilacRange = (event, newValue) => {
    setLilacAgeValue(newValue);
  };

  // agemark

  const marks = [
    {
      value: 20,
    },
    {
      value: 21,
    },
    {
      value: 22,
    },
    {
      value: 23,
    },
    {
      value: 24,
    },
    {
      value: 25,
    },
    {
      value: 26,
    },
    {
      value: 27,
    },
    {
      value: 28,
    },
    {
      value: 29,
    },
  ];

  return (
    <div>
      <NickName></NickName>
      <UserAge></UserAge>
      <MatchingType></MatchingType>
      <OtherRange></OtherRange>
      <Ticket></Ticket>
      <Container>
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

          <Form.Group controlId="userAge" className="md-3">
            <Form.Label>본인 나이를 선택해주세요@</Form.Label>
            <Form.Group as={Row}>
              <Col xs="9">
                <RangeSlider
                  value={userAge}
                  min={20}
                  max={30}
                  onChange={(e) => setUserAge(e.target.value)}
                />
              </Col>
              <Col xs="3">
                <Form.Control value={userAge} />
              </Col>
            </Form.Group>
          </Form.Group>

          <Form.Group controlId="matchingType">
            <Form.Label>신청할 타입은 ??</Form.Label>
            {["checkbox"].map((type) => (
              <div key={`inline-${type}`} className="mb-3">
                <Form.Check
                  onClick={handleLilacVisible}
                  inline
                  label="라일락"
                  name="ticket"
                  type={type}
                  id={`matchingType${type}-1`}
                ></Form.Check>
                <Form.Check
                  onClick={handleDaisyVisible}
                  inline
                  label="데이지 이성"
                  name="ticket"
                  type={type}
                  id={`matchingType${type}-2`}
                ></Form.Check>
                <Form.Check
                  onClick={handleDaisyGayVisible}
                  inline
                  label="데이지 동성"
                  name="ticket"
                  type={type}
                  id={`matchingType${type}-3`}
                ></Form.Check>
              </div>
            ))}
          </Form.Group>
          <Form.Group controlId="lilacSubmit">
            {lilacVisible ? (
              ""
            ) : (
              <Form.Group controlId="lilacOther" className="md-3">
                <Form.Label>
                  라일락 상대방의 나이 범위를 선택해주세요@
                </Form.Label>
                <Slider
                  value={lilacAgeValue}
                  onChange={updateLilacRange}
                  min={20}
                  max={29}
                  valueLabelDisplay="on"
                  marks={marks}
                  p={3}
                ></Slider>

                <Form.Label>라일락</Form.Label>
                <select className="custom-select" size="lg">
                  <option value="0">0</option>
                  <option value="0">1</option>
                  <option value="0">2</option>
                </select>
              </Form.Group>
            )}
          </Form.Group>
          <Form.Group controlId="lilacSubmit">
            {daisyVisible ? (
              ""
            ) : (
              <Form.Group controlId="daisyOther" className="md-3">
                <Form.Label>
                  데이지 이성 상대방의 나이를 선택해주세요@
                </Form.Label>
                <Form.Control type="range" mix={20} max={30} />
                <Form.Label>데이지 이성</Form.Label>
                <select className="custom-select" placeholder="0">
                  <option value="0">0</option>
                  <option value="0">1</option>
                  <option value="0">2</option>
                </select>
              </Form.Group>
            )}
          </Form.Group>
          <Form.Group controlId="lilacSubmit">
            {daisyGayVisible ? (
              ""
            ) : (
              <Form.Group controlId="daisyGayOther" className="md-3">
                <Form.Label>
                  데이지 동성 상대방의 나이를 선택해주세요@
                </Form.Label>
                <Form.Control type="range" mix={20} max={29} />
                <Form.Label>데이지 동성</Form.Label>
                <select className="custom-select" placeholder="0">
                  <option value="0">0</option>
                  <option value="0">1</option>
                  <option value="0">2</option>
                </select>
              </Form.Group>
            )}
          </Form.Group>
          <Form.Group controlId="finalBtn">
            <Row>
              <Col>
                <NavLink to="/">
                  <Button variant="primary" type="submit">
                    Home
                  </Button>
                </NavLink>
              </Col>
              <Col>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Col>
            </Row>
          </Form.Group>
        </Form>
      </Container>
    </div>
  );
};

export default Submit;
