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
  color: rgb(0,0,0, 0.9);
  padding: 5px;
  width: 17rem;
  height: 6rem;
  border-radius: 15px;
  border: 1px solid rgb(125, 200, 224, 0.5);
  background-color: rgb(125, 200, 224, 0.1);
  list-style : none;
  .EP_Num{
    font-family: "Noto Sans KR", sans-serif;
    font-weight: 500;
    font-size: 0.8rem;
  }
  .EP_School_Name{
    font-family: "Noto Sans KR", sans-serif;
    font-weight: 500;
    font-size: 1.1rem;
  }
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

  const { setEP_School_Name,
    setEP_Num,
    setEP_Start_Day,
    setEP_End_Day,
    setEP_Result_Day } = props;

  return (
    <div>
      <Container>
        <Title 제목={제목} />
        <Tada>
          <NavLink to="/currentevent/EP">
            <Buttoncontent
              {...props}
              요소wrap={요소wrap}
              요소btn={요소btn}
              School_Name={['건국대학교 서울캠퍼스', '세종대학교']}
              Num = {1}
              Start_Day="0721"
              End_Day="0724"
              Result_Day="0725" />
          </NavLink>
        </Tada>
        <Tada>
        <NavLink to="/currentevent/EP">
            <Buttoncontent
              {...props}
              요소wrap={요소wrap}
              요소btn={요소btn}
              School_Name={['단국대학교 죽전캠퍼스', '강남대학교']}
              Num = {2}
              Start_Day="0721"
              End_Day="0724"
              Result_Day="0725" />
          </NavLink>
        </Tada>
        <Tada>
        <NavLink to="/currentevent/EP">
            <Buttoncontent
              {...props}
              요소wrap={요소wrap}
              요소btn={요소btn}
              School_Name={['을지대학교 성남캠퍼스', '가천대학교 성남캠퍼스']}
              Num = {3}
              Start_Day="0721"
              End_Day="0724"
              Result_Day="0725" />
          </NavLink>
        </Tada>
        <Tada>
        <NavLink to="/currentevent/EP">
            <Buttoncontent
              {...props}
              요소wrap={요소wrap}
              요소btn={요소btn}
              School_Name={['성균관대학교 수원캠퍼스', '경희대학교 국제캠퍼스']}
              Num = {4}
              Start_Day="0721"
              End_Day="0724"
              Result_Day="0725" />
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

function Buttoncontent(props) {

  const handleallprops = () =>{
    setEP_Num(Num);
    setEP_Start_Day(Start_Day);
    setEP_School_Name(School_Name);
    setEP_End_Day(End_Day);
    setEP_Result_Day(Result_Day);
  };
  const { setEP_School_Name,
    setEP_Num,
    setEP_Start_Day,
    setEP_End_Day,
    setEP_Result_Day } = props;

  const {
    School_Name, 
    Num, 
    Start_Day, 
    End_Day, 
    Result_Day
  } = props;

  return (
    <요소wrap>
      <요소btn Num = {1} School_Name = {School_Name}  onClick = {handleallprops}>
        <li className = 'EP_Num'>{props.Num + "회차"}</li>
        {School_Name_Rendering(School_Name)}
      </요소btn>
    </요소wrap>
  )
};

const School_Name_Rendering = (School_Name) =>{
  const result = [];
  let length = School_Name.length;
  for (let i =0; i<length; i++){
    result.push(<h1 key = {i} className = 'EP_School_Name'>{School_Name[i]} </h1>)
  }
  return result;
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
