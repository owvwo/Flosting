import React, { Component, useEffect } from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { firstTerm } from "./FirstTerm";
import { SecondTerm } from "./SecondTerm";
import { NavLink } from "react-router-dom";
import Certification from "./Certification";

const Button = styled.button`
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 700;
  padding: 10px 15px;
  margin: 2rem 0;
  border: none;
  border-radius: 5px;
  height: 3rem;
  width: 100%;
  background-color: #e0bcc1;
  color: #ffffff;
  opacity: ${(props) => {
    if (props.disabled) return "0.5";
    else return "1.0";
  }};
  cursor: ${(props) => {
    if (props.disabled) return "default";
    else return "pointer";
  }};
`;

const Boldtheme = createMuiTheme({
  palette: {
    primary: {
      main: "#E0BCC1",
    },
  },
  typography: {
    fontSize: 10,
    fontWeightRegular: 700,
    fontFamily: "Noto Sans KR",
  },
});
const Wrapper = styled.div``;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 400;
  margin: 3rem 2rem;
  padding: 0.5rem 1rem;
  background: rgba(224, 188, 193, 0.2);
  border-radius: 10px;
  border: 2px solid #d1d1d1;

  h1 {
    margin-top: 1rem;
    font-weight: 700;
    font-size: 1.5rem;
  }
`;

const ScrollBox = styled.div`
  overflow: scroll;
  height: 150px;
  border: 2px solid #d1d1d1;
  border-radius: 10px;
  padding: 8px;
  background: #f7f7f7;

  p {
    margin: 0px;
    padding: 0px;
    font-size: 0.5rem;
  }
`;
const SmallScrollBox = styled.div`
  overflow: scroll;
  height: 50px;
  width: 100%;
  border: 2px solid #d1d1d1;
  border-radius: 10px;
  padding: 8px;
  background: #f7f7f7;

  p {
    margin: 0px;
    font-size: 0.5rem;
  }
`;
const CheckContainer = styled.div`
  display: flex;
  p {
    font-size: 10px;
  }
`;
function Terms(props) {
  const [allchecked, setCheckedAll] = React.useState(false);
  const [achecked, setCheckedA] = React.useState(false);
  const [bchecked, setCheckedB] = React.useState(false);
  const [cchecked, setCheckedC] = React.useState(false);
  const [disabledcheck, setDC] = React.useState(true);

  function goNext() {
    if (achecked && bchecked && cchecked) setDC(false);
    else setDC(true);
  }

  useEffect(() => {
    goNext();
  }, [achecked]);
  useEffect(() => {
    goNext();
  }, [bchecked]);
  useEffect(() => {
    goNext();
  }, [cchecked]);
  useEffect(() => {
    goNext();
  }, [allchecked]);

  const handleallChecked = (event) => {
    setCheckedAll(!allchecked);
    if (!allchecked) {
      setCheckedA(true);
      setCheckedB(true);
      setCheckedC(true);
    } else {
      setCheckedA(false);
      setCheckedB(false);
      setCheckedC(false);
    }
    goNext();
  };

  if (!props.auth_regis) {
    return <Redirect to="/register" />;
  } else {
    return (
      <Wrapper>
        <ThemeProvider theme={Boldtheme}>
          <Container>
            <h1>?????? ??????</h1>
            <CheckContainer>
              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    checked={allchecked}
                    onChange={handleallChecked}
                    name="checkedall"
                    size="small"
                  />
                }
                label="????????? ?????? ???????????????."
              />
            </CheckContainer>
            {/* ????????? ???????????? ?????? ?????? */}
            <CheckContainer>
              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    checked={achecked}
                    onChange={() => setCheckedA(!achecked)}
                    name="checkedA"
                    size="small"
                  />
                }
                label="????????? ???????????? ?????? (??????)"
              />
            </CheckContainer>
            {achecked ? (
              ""
            ) : (
              <ScrollBox>
                {firstTerm.split("\n").map((line) => {
                  return (
                    <p>
                      {line}
                      <br />
                    </p>
                  );
                })}
              </ScrollBox>
            )}
            {/* ???????????? ?????? ??? ?????? ?????? ?????? */}
            <CheckContainer>
              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    checked={bchecked}
                    onChange={() => setCheckedB(!bchecked)}
                    name="checkedB"
                    size="small"
                  />
                }
                label="???????????? ?????? ??? ?????? ?????? (??????)"
              />
            </CheckContainer>
            {bchecked ? (
              ""
            ) : (
              <ScrollBox>
                {SecondTerm.split("\n").map((line) => {
                  return (
                    <p>
                      {line}
                      <br />
                    </p>
                  );
                })}
              </ScrollBox>
            )}
            {/* ??? 14??? ?????? */}
            {/* ???????????? ?????? ??? ?????? ?????? ?????? */}
            <CheckContainer>
              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    checked={cchecked}
                    onChange={() => setCheckedC(!cchecked)}
                    name="checkedC"
                    size="small"
                  />
                }
                label="??? 14??? ???????????????."
              />
            </CheckContainer>
            {cchecked ? (
              ""
            ) : (
              <SmallScrollBox>
                <p>
                  ??????????????? ?????? ???????????? ?????? ???????????????, ?????? ????????? ?????? ???
                  14??? ????????? ????????? ??? ????????????.
                </p>
              </SmallScrollBox>
            )}
            <NavLink to="/register/certification">
              <Button disabled={disabledcheck}>????????? ??????</Button>
            </NavLink>
          </Container>
        </ThemeProvider>
      </Wrapper>
    );
  }
}

export default Terms;
