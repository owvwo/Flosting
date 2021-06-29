import React from "react";
import { Button, Form, Container, Row, Col, Image } from "react-bootstrap";

const Submit = () => {
  return (
    <div>
      <Container>
        <h1>참가 신청서</h1>
        <Row>
          <Col xs={6} md={4}>
            <Image src="/Img/thumNail.png" roundedCircle />
          </Col>
        </Row>
      </Container>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            - 부적절한 닉네임 설정시 신청이 취소됩니다.
          </Form.Text>
          <Form.Text className="text-muted">
            - 닉네임은 상대방에게 공개됩니다.
          </Form.Text>
          <Form.Text className="text-muted">
            - 라일락팅과 데이지팅 모두 동일한 닉네임을 설정해주세요.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
        {["checkbox", "radio"].map((type) => (
          <div key={`default-${type}`} className="mb-3">
            <Form.Check
              type={type}
              id={`default-${type}`}
              label={`default ${type}`}
            />

            <Form.Check
              disabled
              type={type}
              label={`disabled ${type}`}
              id={`disabled-default-${type}`}
            />
          </div>
        ))}
      </Form>
    </div>
  );
};

export default Submit;
