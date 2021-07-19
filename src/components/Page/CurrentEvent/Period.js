import React from "react";
import styled from "styled-components";

const Container = styled.div`
  text-align: center;
  margin-bottom: 1rem;
  .title {
    margin-top: 15px;
    font-size: 2rem;
    font-weight: bolder;
  }
  .subtitle {
    font-weight: bold;
    margin-top: 10px;
  }
  img {
    width: 15rem;
  }
  .scheduleBox {
    display: flex;
    .scheduleLeft {
      flex: 1;
      height: 6rem;
    }
    .scheduleRight {
      flex: 1;
      height: 5rem;
    }
    .scheduleTitle {
      font-size: 2rem;
      font-weight: bold;
    }
    .inner {
      font-size: 1rem;
      margin-top: 5px;
      margin: 0 auto;
      width: 150px;
      background-color: #f8ecf4;
    }
  }
  .submitBtn {
    width: 80%;
    height: 3rem;
    background-color: ;
  }
`;
const Period = (props) => {
  const period = props.period;
  return (
    <Container>
      <div className="scheduleBox">
        <div className="scheduleLeft">
          <div className="scheduleTitle">신청기간</div>
          <div className="inner">{period}</div>
        </div>
        <div className="scheduleRight">
          <div className="scheduleTitle">결과발송</div>
          <div className="inner">{period}</div>
        </div>
      </div>
    </Container>
  );
};

export default Period;
