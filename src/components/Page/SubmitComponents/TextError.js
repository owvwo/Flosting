import React from "react";
import styled from "styled-components";
const Error = styled.div`
  color: red;
`;

const TextError = (props) => {
  return <Error>{props.children}</Error>;
};

export default TextError;
