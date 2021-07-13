import React, { Component, useState, useEffect } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import LoginBar from "./LoginBar";
import fire from "../Register/LoginFire";
import { Redirect } from "react-router-dom";

const Wrapper = styled.div``;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const FlostingTitle = styled.div`
  font-family: "Lobster", cursive;
  font-size: 40px;
  border: 1.5px solid;
  padding: 5px;
  margin: 5px;
  margin-bottom: 4rem;
`;
const Button = styled.button`
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 700;
  padding: 10px 15px;
  margin: 5px;
  border: ${(props) => {
    if (props.register) return "none";
    else if (props.login) return "1px solid #E0BCC1";
  }};
  border-radius: 5px;
  height: 3rem;
  width: 300px;
  background-color: ${(props) => {
    if (props.register) return "#E0BCC1";
    else if (props.login) return "#FFFFFF";
  }};
  color: ${(props) => {
    if (props.register) return "#FFFFFF";
    else if (props.login) return "#828282";
  }};
  font-size: 15pt;
`;

const Login = () => {
  const [currentPage, handlePageChange] = useState(false);
  const [user, setUser] = useState("");

  const authListener = () => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser("");
      }
    });
  };

  useEffect(() => {
    authListener();
  }, []);

  if (user) {
    return <Redirect to="/" />;
  } else {
    return (
      <Wrapper>
        <Container>
          <FlostingTitle>Flosting</FlostingTitle>
          {currentPage == false ? (
            <Container>
              <Button login onClick={() => handlePageChange(true)}>
                로그인
              </Button>
              <NavLink to="/register">
                <Button register>회원가입</Button>
              </NavLink>
            </Container>
          ) : (
            <LoginBar />
          )}
        </Container>
      </Wrapper>
    );
  }
};
export default Login;
