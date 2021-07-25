import React from "react";
import styled from "styled-components";
import eventMain from "../../../images/violet.png";
import Footer from "../Footer";
import { NavLink } from "react-router-dom";

const Title = styled.h1`
  fontfamily: "Noto Sans KR", sans-serif;
  font-size: x-large;
  color: #e0bcc1;
  text-align: center;
  margin: 1rem;
`;

const Divider = styled.div`
  margin: 1rem;
  opacity: 0.8;
`;

const Container = styled.div`
  font-family: "Noto Sans KR", sans-serif;
  left: 0;
  width: 100%;
  height: 40rem;
  overflow: scroll;
  align-items: center;
  background-color: white;
`;

const Text = styled.p`
  margin: 1rem;
  font-size: 13px;
  opacity: 0.7;
  text-align: center;
`;

const NavContainer = styled.div`
  border: solid 2px #f4f4f4;
  border-radius: 10px;
  margin: 0.5rem;
  img {
    width: 15rem;
    margin: 1rem auto;
    display: block;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
`;

const Button = styled.button`
  margin: 1rem auto;
  text-align: center;
  justify-content: center;
  height: 5rem;
  width: 70%;
  border-radius: 5px;
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 700;
  padding: 10px 15px;
  background-color: #e0bcc1;
  color: #ffffff;
  font-size: 2rem;
  display: block;
  border: none;
`;

function EventDetail(props) {
  return (
    <Container>
      <Title>오픈 기념 이벤트</Title>
      <NavContainer>
        <Text>
          오픈 기념 무료 매칭 이벤트!! <br /> 지금 바로 신청하세요~~
        </Text>
        <img src={eventMain}></img>
        <NavLink to="/currentevent">
          <Button>신청하기!!</Button>
        </NavLink>
      </NavContainer>

      <Footer></Footer>
    </Container>
  );
}

export default EventDetail;
