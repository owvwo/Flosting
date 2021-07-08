import React from "react";
import styled from "styled-components";
// import{Link} from 'react-router-dom';

const Wrapper = styled.div`
  text-align: center;
  padding: 10px;
`;

const Button = styled.button`
  padding: 10px 15px;
  margin: 5px;
  border: none;
  border-radius: 5px;
  width: 300px;
  background-color: ${(props) => {
    if (props.kakao) return "#FFFF00";
    else if (props.insta) return "#9A2EFE";
    else if (props.home) return "#7B838B";
  }};
  color: #000000;
  font-size: 15pt;
`;

function SNSLink() {
  return (
    <Wrapper>
      <Button
        kakao
        onClick={() => {
          window.open("http://pf.kakao.com/_xfuvpK", "_blank");
        }}
      >
        {" "}
        카카오톡 채널{" "}
      </Button>
      <Button
        insta
        onClick={() => {
          window.open("https://www.instagram.com/flosting__/", "_blank");
        }}
      >
        {" "}
        인스타그램{" "}
      </Button>
      <Button home Link="/home">
        {" "}
        HOME{" "}
      </Button>
    </Wrapper>
  );
}
export default SNSLink;
