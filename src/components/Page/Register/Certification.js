import React, { Component, useState, useEffect } from 'react'
import styled from 'styled-components';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import axios from 'axios';


const Colortheme = createMuiTheme({
  palette: {
    primary: {
      main: '#E0BCC1'
    }
  },
  typography: {
    fontSize: 10,
    fontWeightRegular: 700,
    fontFamily: "Noto Sans KR"
  }

})

const Wrapper = styled.div`
`;

const Container = styled.div`
    font-family: 'Noto Sans KR', sans-serif;
    font-weight: 400;
    margin: 0rem 2rem;
    

    h1{
        font-size: 1.5rem;
        margin-top: 2rem;
    }
`;

const Button = styled.button`
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 700;
  padding: 10px 15px;
  margin: 0rem 0rem 2rem 0rem;
  border: none;
  border-radius: 5px;
  height: 3rem;
  width: 100%;
  background-color: #E0BCC1;
  color: #FFFFFF;
  opacity: ${props => {
    if (props.disabled) return '0.5';
    else return '1.0';
  }};
  cursor: ${props => {
    if (props.disabled) return 'default';
    else return 'pointer'
  }};
`;

const PhoneButton = styled.button`
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 700;
  padding: 10px 15px;
  margin: 0rem 0rem 2rem 0rem;
  border: none;
  border-radius: 5px;
  height: 3rem;
  width: 100%;
  background-color: #E0BCC1;
  color: #FFFFFF;
`;

const School_title = styled.div`
    font-size: 1.0rem;
    color: '#828282';
    margin: 2rem 0rem 1rem 0rem;
`;
const School_content = styled.div`
    color : ${props => {
    if (props.canNext) return '#EF0C00';
    else return '#00AB6F';
  }};
    font-size: 0.5rem;
    margin : 1rem 0rem 1rem 0rem;
`;





const Certification = (props) => {
  const [canNext, setcanNext] = useState(true);
  const [goMessage, setgoMessage] = useState('아래 버튼을 눌러 휴대폰 인증을 완료해주세요.');

  //본인인증 화면에 채워넣을 데이터
  let data = {
    company: '플로스 컴패니',            // 회사명 또는 URL
    name: '',                           // 이름
    phone: '',                          // 전화번호
    birth: '',                          //생년원일
    gender: '',                        //성별
    min_age: '18'                        //최소 만 나이                       
  };

  let getdatatest;

  /* 3. 콜백 함수 정의하기 */
  function callback(response) {
    const {
      imp_uid,
      success,
      merchant_uid,
      error_msg,
    } = response;

    if (success) {

      // <-- 이부분에서, 인증 data값을 받아올 수 있는 방법 ??


      setgoMessage('본인인증이 완료되었습니다! 다음으로 넘어가주세요.')
      console.log('imp_uid = ' + imp_uid);
      console.log('merchant_uid = ' + merchant_uid);
      console.log("성공");
      setcanNext(false);
    } else {
      alert(`본인인증 실패: ${error_msg}`);
    }

  }
  function testaxios() {
    let testdata;
    
    // const getToken = axios({
    //   url: "https://api.iamport.kr/users/getToken",
    //   method: "post", // POST method
    //   headers: { "Content-Type": "application/json" }, // "Content-Type": "application/json"
    //   data: {
    //     imp_key: "1493803405522148", // REST API키
    //     imp_secret: "b9cb96c92d43544b6f2b2b155d961903edd5419f750454e7321e5235438e1476c0030cfca8db3ac4" // REST API Secret
    //   }
    // });

    axios({
      url : "https://api.iamport.kr/users/getToken",
      method: "post", // POST method
      headers: { "Content-Type": "application/json" }, // "Content-Type": "application/json"
      data: {
        imp_key: "1493803405522148", // REST API키
        imp_secret: "b9cb96c92d43544b6f2b2b155d961903edd5419f750454e7321e5235438e1476c0030cfca8db3ac4" // REST API Secret
      }
    }).then(function (response){
        testdata = response;
        console.log(testdata);
    }).catch(function (error){
      console.log(error);
    }).then(function () {
      console.log('always');
    });
    // axios.get("https://api.iamport.kr/users/getToken",{
    //   method: "post", // POST method
    //   headers: { "Content-Type": "application/json" }, // "Content-Type": "application/json"
    //   data: {
    //     imp_key: "1493803405522148", // REST API키
    //     imp_secret: "b9cb96c92d43544b6f2b2b155d961903edd5419f750454e7321e5235438e1476c0030cfca8db3ac4" // REST API Secret
    //   }
    // }).then(function (response){
    //   testdata = response;
    //   console.log(testdata);
    // }).catch(function (error){
    //   console.log(error);
    // }).then(function () {
    //   console.log('always');
    // });
  }



  //   {
  //   url: "https://api.iamport.kr/users/getToken",
  //   method: "post", // POST method
  //   headers: { "Content-Type": "application/json" }, // "Content-Type": "application/json"
  //   data: {
  //     imp_key: "1493803405522148", // REST API키
  //     imp_secret: "b9cb96c92d43544b6f2b2b155d961903edd5419f750454e7321e5235438e1476c0030cfca8db3ac4" // REST API Secret
  //   }
  // });

  function onClickCertification() {
    /* 1. 가맹점 식별하기 */
    const { IMP } = window;
    IMP.init('imp73280791');


    /* 4. 본인인증 창 호출하기 */
    IMP.certification(data, callback);
  }

  return (
    <ThemeProvider theme={Colortheme}>
      <Wrapper>
        <Container>
          <h1>
            휴대폰 인증
          </h1>
          <School_title>
            한 사람당 하나의 계정을 가지기 위함이에요!
          </School_title>
          <School_content canNext={canNext}>
            {goMessage}
          </School_content>
          <PhoneButton onClick={testaxios} >
            휴대폰 인증
          </PhoneButton>
          <NavLink to="/register/last">
            <Button disabled={canNext}>
              다음
            </Button>
          </NavLink>
        </Container>
      </Wrapper>
    </ThemeProvider>
  );
}

export default Certification;