import React, { useCallback, useState, useEffect } from "react";
import * as Yup from "yup";
import FormikControl from "./FormikControl";
import fire from "../../Register/LoginFire";
import Slider from "react-slick";
import styled from "styled-components";
import lilac from "../../../../images/003.png";
import daisy from "../../../../images/004.png";
import submitMain from "../../../../images/002.png";
import submitFinal from "../../../../images/006.png";
import clover from "../../../../images/005.png";
import "../FormikContainer.css";
import { Redirect, Link } from "react-router-dom";
import {
  createMuiTheme,
  ThemeProvider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@material-ui/core";
import Fade from "react-reveal/Fade";
import { settings } from "./SlickSliderSetting";
import CheckDbData from "./CheckDbData";

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

const ErrorMsg = styled.div`
  font-family: "Noto Sans KR", sans-serif;
  color: red;
  font-size: 0.7rem;
`;

const InputContainer = styled.div`
  text-align: center;
  justify-content: center;
  display: flex;
`;

const TypeImage = styled.div`
  position: relative;
  z-index: 1;
  img {
    width: ${(props) => (props.Size ? "20rem" : "10rem")};
    margin: 0px auto;
    margin-top: ${(props) => (props.Size ? "-10rem" : "-7rem")};
  }
  margin: 1rem;
`;

const SlidNext = styled.div`
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 700;
  margin: 1rem 0rem;
`;

const Container = styled.div`
width:  
margin: 1rem;
  text-align: center;
  justify-content: center;
  display: flex;
  img {
    width: 20rem;
    margin: 0px auto;
    margin-bottom : -3rem;
  }
p{
  margin : 1rem;
}
`;

const SubmitButton = styled.button`
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 400;
  margin: 1rem auto;
  height: 5rem;
  width: 20rem;
  border-radius: 10px;
  font-weight: 700;
  background-color: ${(props) => props.color};
  color: #ffffff;
  font-size: 2rem;
  border: none;
`;

const Title = styled.h1`
  font-family: "Noto Sans KR", sans-serif;
  font-size: x-large;
  color: #f7bb9e;
`;

const ToggleButton = styled.button`
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 500;
  border-radius: 10px;
  margin: 1rem;
  padding: 10px 15px;
  width: 20rem;
  border: 1px solid rgb(0, 0, 0, 0.2);
  background-color: ${(props) => props.color};
`;

const SubText = styled.div`
  position: relative;
  z-index: 2;
  margin: 1rem;
  p {
    font-size: ${(props) => (props.setFont ? "15px" : "10px")};
  }
  b {
    font-size: ${(props) => (props.setFont ? "15px" : "10px")};
  }
`;

const MainText = styled.div`
  margin: 1rem;
`;

function useToggle(initialValue = true, values) {
  const [value, setValue] = useState(initialValue);
  const toggle = useCallback(() => {
    setValue((v) => !v);
  }, []);

  return [value, toggle];
}

function EnrollmentForm(props, match) {
  // User ID
  const {
    User,
    ID,
    EP_Num,
    lilac_Age,
    setlilac_Age,
    lilac_Univ,
    setlilac_Univ,
    lilac_Ticket,
    setlilac_Ticket,
    lilac_Ticket_FT,
    setlilac_Ticket_FT,
    daisy_Age,
    setdaisy_Age,
    daisy_Univ,
    setdaisy_Univ,
    daisy_Ticket,
    setdaisy_Ticket,
    daisy_Ticket_FT,
    setdaisy_Ticket_FT,
    clover_Age,
    setclover_Age,
    clover_Univ,
    setclover_Univ,
    clover_Ticket,
    setclover_Ticket,
    clover_Ticket_FT,
    setclover_Ticket_FT,
    setPayment,
  } = props;
  // const EP = match.params.EP;
  // console.log(EP);
  // formik ?????? ???
  // ????????? ??????
  const validationSchema = Yup.object({});
  // ??????????????? ?????????
  const [lilacOn, setLilacOn] = useToggle(true);
  const [daisyOn, setDaisyOn] = useToggle(true);
  const [cloverOn, setCloverOn] = useToggle(true);
  // alert Dialog Message
  const [open, setOpen] = useState(false);
  // db ?????? ??????
  const [IsSubmit, setIsSubmit] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  // ?????? ????????? ?????????
  const handleLilac = () => {
    setLilacOn();
  };
  const handleDaisy = () => {
    setDaisyOn();
  };
  const handleClover = () => {
    setCloverOn();
  };

  const db = fire.firestore();
  // ????????? ?????? ????????????
  useEffect(() => {
    if (User) {
      db.collection("Flosting_" + EP_Num)
        .where("ID", "==", ID)
        .get()
        .then((querySnapshot) => {
          if (querySnapshot) {
            querySnapshot.forEach((doc) => {
              setIsSubmit(true);
            });
          } else {
            // console.log("???????????????");
          }
        });
    }
  }, [User]);

  // Submit Handler
  const onSubmit = () => {
    if (lilacOn) {
      setlilac_Ticket_FT(false);
    } else {
      setlilac_Ticket_FT(true);
    }

    if (daisyOn) {
      setdaisy_Ticket_FT(false);
    } else {
      setdaisy_Ticket_FT(true);
    }

    if (cloverOn) {
      setclover_Ticket_FT(false);
    } else {
      setclover_Ticket_FT(true);
    }

    setPayment(true);
  };

  return (
    <ThemeProvider theme={Boldtheme}>
      {IsSubmit ? (
        <div>
          <CheckDbData EP_Num={EP_Num} User={User} ID={ID} />
        </div>
      ) : (
        <div>
          <Slider {...settings}>
            <Container>
              <Fade bottom cascade>
                <Title>User Info</Title>

                <img src={submitMain}></img>
                <MainText>
                  <p>{User.Nick}??? ???????????????. </p>
                  <p>????????? ???????????? ???????????? ??????</p>
                  <p>???????????? ???????????????.</p>
                </MainText>
              </Fade>
            </Container>

            <InputContainer>
              <Title>Lilac</Title>
              <SubText setFont={lilacOn}>
                <p>???????????? ??????</p>
                <p>
                  <b>'????????? ????????? ?????? ??????'</b>
                </p>
                <br></br>
                <p>
                  ??????????????? ?????? ????????? <b>??????</b>???
                </p>
                <p>????????? ????????? ???????????????.</p>
                <br></br>
              </SubText>
              <TypeImage Size={lilacOn}>
                <img src={lilac} />
              </TypeImage>
              {/* ????????? ?????? */}
              <ToggleButton
                type="button"
                onClick={handleLilac}
                color={
                  lilacOn ? "rgb(247,244,148,0.5)" : "rgb(208,174,209,0.5)"
                }
              >
                {lilacOn ? "?????? ??????" : "?????? ??????"}
              </ToggleButton>
              {!lilacOn ? (
                <div>
                  {/* ?????? ?????? */}
                  <FormikControl
                    blockSubmit={lilacOn}
                    control="ticket"
                    label="?????? ??????"
                    disabled={lilacOn}
                    controlAge={lilac_Age}
                    setcontrolAge={setlilac_Age}
                    controlUniv={lilac_Univ}
                    setcontrolUniv={setlilac_Univ}
                    controlTicket={lilac_Ticket}
                    setcontrolTicket={setlilac_Ticket}
                  />
                  {/* ?????? ?????? */}
                  <FormikControl
                    blockSubmit={lilacOn}
                    control="select"
                    label="?????? ??????"
                    disabled={lilacOn}
                    controlAge={lilac_Age}
                    setcontrolAge={setlilac_Age}
                    controlUniv={lilac_Univ}
                    setcontrolUniv={setlilac_Univ}
                    controlTicket={lilac_Ticket}
                    setcontrolTicket={setlilac_Ticket}
                  />
                  <FormikControl
                    type={"lilac"}
                    blockSubmit={lilacOn}
                    control="radio"
                    label="????????? ????????? ??????????????????"
                    disabled={lilacOn}
                    controlAge={lilac_Age}
                    setcontrolAge={setlilac_Age}
                    controlUniv={lilac_Univ}
                    setcontrolUniv={setlilac_Univ}
                    controlTicket={lilac_Ticket}
                    setcontrolTicket={setlilac_Ticket}
                  />
                  <SlidNext>????????? ???????????????</SlidNext>
                </div>
              ) : (
                ""
              )}
            </InputContainer>
            <InputContainer>
              <Title>Daisy</Title>
              <SubText setFont={daisyOn}>
                <p>
                  ???????????? ?????? <br />
                  <b>'??????'</b>
                </p>
                <br></br>
                <p>??????????????? ??????</p>
                <p>
                  <b>??????</b> ????????? ?????????
                </p>
                <p>
                  <b>??????</b>??? ???????????????
                </p>
              </SubText>
              <TypeImage Size={daisyOn}>
                <img src={daisy} />
              </TypeImage>
              {/* ????????? ?????? */}
              <ToggleButton
                type="button"
                onClick={handleDaisy}
                color={
                  daisyOn ? "rgb(247,244,148,0.5)" : "rgb(208,174,209,0.5)"
                }
              >
                {daisyOn ? "?????? ??????" : "?????? ??????"}
              </ToggleButton>
              {!daisyOn ? (
                <div>
                  {/* ?????? ?????? */}
                  <FormikControl
                    blockSubmit={daisyOn}
                    control="ticket"
                    label="?????? ??????"
                    disabled={daisyOn}
                    controlAge={daisy_Age}
                    setcontrolAge={setdaisy_Age}
                    controlUniv={daisy_Univ}
                    setcontrolUniv={setdaisy_Univ}
                    controlTicket={daisy_Ticket}
                    setcontrolTicket={setdaisy_Ticket}
                  />
                  {/* ?????? ?????? */}
                  <FormikControl
                    blockSubmit={daisyOn}
                    control="select"
                    label="?????? ??????"
                    disabled={daisyOn}
                    controlAge={daisy_Age}
                    setcontrolAge={setdaisy_Age}
                    controlUniv={daisy_Univ}
                    setcontrolUniv={setdaisy_Univ}
                    controlTicket={daisy_Ticket}
                    setcontrolTicket={setdaisy_Ticket}
                  />
                  <FormikControl
                    type={"daisy"}
                    blockSubmit={daisyOn}
                    control="radio"
                    label="????????? ????????? ??????????????????"
                    disabled={daisyOn}
                    controlAge={daisy_Age}
                    setcontrolAge={setdaisy_Age}
                    controlUniv={daisy_Univ}
                    setcontrolUniv={setdaisy_Univ}
                    controlTicket={daisy_Ticket}
                    setcontrolTicket={setdaisy_Ticket}
                  />
                  <SlidNext>????????? ???????????????</SlidNext>
                </div>
              ) : (
                ""
              )}
            </InputContainer>
            <InputContainer>
              <Title>Clover</Title>
              <SubText setFont={cloverOn}>
                <p>???????????? ??????</p>
                <p>
                  <b>'??????, ??????'</b>
                </p>
                <br></br>
                <p>??????????????? ??????</p>
                <p>????????? ?????????</p>
                <p>
                  <b>??????</b> ????????? ???????????????!
                </p>
              </SubText>
              <TypeImage Size={cloverOn}>
                <img src={clover} />
              </TypeImage>
              {/* ?????? ?????? */}
              <ToggleButton
                type="button"
                onClick={handleClover}
                color={
                  cloverOn ? "rgb(247,244,148,0.5)" : "rgb(208,174,209,0.5)"
                }
              >
                {cloverOn ? "?????? ??????" : "?????? ??????"}
              </ToggleButton>
              {!cloverOn ? (
                <div>
                  {/* ?????? ?????? */}
                  <FormikControl
                    blockSubmit={cloverOn}
                    control="ticket"
                    label="?????? ??????"
                    disabled={cloverOn}
                    controlAge={clover_Age}
                    setcontrolAge={setclover_Age}
                    controlUniv={clover_Univ}
                    setcontrolUniv={setclover_Univ}
                    controlTicket={clover_Ticket}
                    setcontrolTicket={setclover_Ticket}
                  />
                  {/* ?????? ?????? */}
                  <FormikControl
                    blockSubmit={cloverOn}
                    control="select"
                    label="?????? ??????"
                    disabled={cloverOn}
                    controlAge={clover_Age}
                    setcontrolAge={setclover_Age}
                    controlUniv={clover_Univ}
                    setcontrolUniv={setclover_Univ}
                    controlTicket={clover_Ticket}
                    setcontrolTicket={setclover_Ticket}
                  />
                  <FormikControl
                    type={"clover"}
                    blockSubmit={cloverOn}
                    control="radio"
                    label="????????? ????????? ??????????????????"
                    disabled={cloverOn}
                    controlAge={clover_Age}
                    setcontrolAge={setclover_Age}
                    controlUniv={clover_Univ}
                    setcontrolUniv={setclover_Univ}
                    controlTicket={clover_Ticket}
                    setcontrolTicket={setclover_Ticket}
                  />
                  <SlidNext>????????? ???????????????</SlidNext>
                </div>
              ) : (
                ""
              )}
            </InputContainer>
            <Container>
              <Title>?????????!!</Title>
              <img src={submitFinal} width={"100%"} />
              {lilacOn && daisyOn && cloverOn ? (
                <div>
                  <SubmitButton
                    type="button"
                    onClick={handleClickOpen}
                    color={"#8F8F8F"}
                    disabled={true}
                  >
                    ????????????!!
                  </SubmitButton>
                  <ErrorMsg>?????? ????????? ????????? ??????????????????</ErrorMsg>
                </div>
              ) : (
                <div>
                  <SubmitButton
                    type="button"
                    onClick={handleClickOpen}
                    color={"#C6B4CE"}
                  >
                    ????????????!!
                  </SubmitButton>

                  <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">
                      {"????????? ?????? ???????????????????"}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        ?????? ???????????? ?????? ??????????????? ?????? ???????????????.
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={onSubmit} color="primary" autoFocus>
                        ???
                      </Button>
                      <Button onClick={handleClose} color="primary">
                        ?????????
                      </Button>
                    </DialogActions>
                  </Dialog>
                </div>
              )}
            </Container>
          </Slider>
        </div>
      )}
    </ThemeProvider>
  );
}

export default EnrollmentForm;
