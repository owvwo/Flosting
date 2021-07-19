import React from "react";
import styled from "styled-components";
import Footer from "../Footer.js";
import { NavLink } from "react-router-dom";
import Tada from "react-reveal/Tada";

const Container = styled.div`
  font-family: "Noto Sans KR", sans-serif;
  left: 0;
  width: 100%;
  height: 40rem;
  overflow: scroll;
  align-items: center;
  background-color: white;
`;
const 제목 = styled.div`
  font-size: 2rem;
  text-align: center;
  margin-top: 2rem;
  font-weight: bolder;
`;

const 요소wrap = styled.div`
  margin-top: 15px;
  text-align: center;
`;

const 요소btn = styled.button`
  color: #9f34ad;
  padding: 5px;
  width: 17rem;
  height: 4rem;
  border-radius: 15px;
  border: 2px solid #c2679d;
  background-color: rgb(255, 180, 224, 0.3);
`;
const 알림wrap = styled.div`
  margin-top: 15px;
  text-align: center;
`;

const 알림btn = styled.button`
  color: 09007a;
  padding: 5px;
  width: 15rem;
  border-radius: 10px;
  border: 1px solid B14AF7;
  background-color: #d7c9ff;
`;

const CurrentEvent = (props) => {
  return (
    <div>
      <Container>
        <Title 제목={제목} />
        <Tada>
          <NavLink to="/currentevent/EP1">
            <요소1 요소wrap={요소wrap} 요소btn={요소btn} />
          </NavLink>
        </Tada>
        <Tada>
          <NavLink to="/currentevent/EP2">
            <요소2 요소wrap={요소wrap} 요소btn={요소btn} />
          </NavLink>
        </Tada>
        <Tada>
          <NavLink to="/currentevent/EP3">
            <요소3 요소wrap={요소wrap} 요소btn={요소btn} />
          </NavLink>
        </Tada>
        <Tada>
          <NavLink to="/currentevent/EP4">
            <요소4 요소wrap={요소wrap} 요소btn={요소btn} />
          </NavLink>
        </Tada>
        <Tada>
          <NavLink to="/currentevent/alarm">
            <알람신청 알림wrap={알림wrap} 알림btn={알림btn} />
          </NavLink>
        </Tada>
      </Container>

      <Footer />
    </div>
  );
};
export default CurrentEvent;

function Title({ 제목 }) {
  return <제목>현재 진행중인 학교들</제목>;
}

function 요소1({ 요소wrap, 요소btn }) {
  return (
    <요소wrap>
      <요소btn>
        1회차
        <br />
        (건국대학교 세종대학교)
      </요소btn>
    </요소wrap>
  );
}
function 요소2({ 요소wrap, 요소btn }) {
  return (
    <요소wrap>
      <요소btn>
        2회차 <br />
        (단국대학교(죽전) 강남대학교)
      </요소btn>
    </요소wrap>
  );
}
function 요소3({ 요소wrap, 요소btn }) {
  return (
    <요소wrap>
      <요소btn>
        3회차
        <br />
        (을지대학교(성남) 가천대학교(성남))
      </요소btn>
    </요소wrap>
  );
}
function 요소4({ 요소wrap, 요소btn }) {
  return (
    <요소wrap>
      <요소btn>
        4회차
        <br />
        (성균관대학교(수원) 경희대학교(국제))
      </요소btn>
    </요소wrap>
  );
}
function 알람신청({ 알림wrap, 알림btn }) {
  return (
    <알림wrap>
      <알림btn>우리학교 알림 신청하기</알림btn>
    </알림wrap>
  );
}
