import React from "react";
import styled from "styled-components";
import SNSLink from "./SNSLink.js";
import Footer from "./Footer.js";
import fire from "./Register/LoginFire";
const Wrapper = styled.div`
  text-align: center;

  p {
    font-size: 1rem;
    padding: 5px;
  }
  .red {
    color: red;
    font-weight: bold;
  }
`;

const Title = styled.div`
  font-size: 1.4rem;
  margin-top: 5rem;
`;

const Confirm = (props) => {
  //   const user = fire.auth().currentUser;
  //   const ID = user.email.split("@");

  return (
    <Wrapper>
      {/* <Title>{user !== null && <h3>{ID[0]}님의 신청정보</h3>}</Title> */}
      <SNSLink />
      <Footer />
    </Wrapper>
  );
};

export default Confirm;
