import React, { useCallback, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "./FormikControl";
import fire from "../../Register/LoginFire";
import { Button } from "@material-ui/core";
import Slider from "react-slick";
import styled from "styled-components";
import lilac from "../../../../images/lilac.png";
import daisy from "../../../../images/daisy.png";
import submitMain from "../../../../images/violet.png";
import clover from "../../../../images/clover.png";
import "../FormikContainer.css";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Redirect } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import Fade from "react-reveal/Fade";
import { ageOptions } from "../components/Options/AgeOptions";
import { desiredUnivOptions } from "./Options/DesiredUnivOptions";
import { settings } from "./SlickSliderSetting";
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

const InputContainer = styled.div`
width:  
margin: 1rem;
  text-align: center;
  justify-content: center;
  display: flex;
  img {
    width: 10rem;
    margin: 0px auto;
  }
`;

const Container = styled.div`
width:  
margin: 1rem;
  text-align: center;
  justify-content: center;
  display: flex;
  img {
    width: 15rem;
    margin: 0px auto;
  }
p{
  margin : 1rem;
}
`;

const SubmitButton = styled.button`
  margin: 1rem auto;
  text-align: center;
  justify-content: center;
  height: 5rem;
  width: 70%;
  border-radius: 5px;
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 700;
  padding: 10px 15px;
  background-color: ${(props) => props.color};
  color: #ffffff;
  font-size: 2rem;
  display: block;
  border: none;
`;

const Title = styled.h1`
  fontfamily: "Noto Sans KR", sans-serif;
  font-size: x-large;
  color: #e0bcc1;
`;

const ToggleButton = styled.button`
  fontfamily: "Noto Sans KR", sans-serif;
  border-radius: 5px;
  margin: 1rem;
  padding: 10px 15px;
  // border: none;
  width: 20rem;
  border-color: #e0bcc1;
  background-color: ${(props) => props.color};
`;

function useToggle(initialValue = true, values) {
  const [value, setValue] = useState(initialValue);
  const toggle = useCallback(() => {
    setValue((v) => !v);
  }, []);

  return [value, toggle];
}

function EnrollmentForm(props) {
  // User ID
  const { User, ID } = props;
  // formik 초기 값
  const initialValues = {
    Daisy: {
      Ticket: false,
      Univ: "",
      Age: "",
    },
    Lilac: {
      Ticket: false,
      Univ: "",
      Age: "",
    },
    Clover: {
      Ticket: false,
      Univ: "",
      Age: "",
    },
  };
  // 유효성 검사
  const validationSchema = Yup.object({});
  // 신청페이지 활성화
  const [lilacOn, setLilacOn] = useToggle(true);
  const [daisyOn, setDaisyOn] = useToggle(true);
  const [cloverOn, setCloverOn] = useToggle(true);
  // redirect state
  const [redirect, setRedirect] = useState(false);
  // alert Dialog Message
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  // 신청 페이지 활성화
  const handleLilac = () => {
    setLilacOn();
  };
  const handleDaisy = () => {
    setDaisyOn();
  };
  const handleClover = () => {
    setCloverOn();
  };
  // Submit Handler
  const onSubmit = (values, onSubmitProps) => {
    values.Lilac.Ticket = !lilacOn;
    values.Daisy.Ticket = !daisyOn;
    values.Clover.Ticket = !cloverOn;
    console.log("User", User);
    console.log("Form data", values);

    
    if (lilacOn) {
      values.Lilac.Age = "";
      values.Lilac.Univ = "";
    } else {
      if (values.Lilac.Age === "" || values.Lilac.Univ === "") {
        values.Lilac.Ticket = false;
      }
    }
    if (daisyOn) {
      values.Daisy.Age = "";
      values.Daisy.Univ = "";
    } else {
      if (values.Daisy.Age === "" || values.Daisy.Univ === "") {
        values.Daisy.Ticket = false;
      }
    }
    if (cloverOn) {
      values.Clover.Age = "";
      values.Clover.Univ = "";
    } else {
      if (values.Clover.Age === "" || values.Clover.Univ === "") {
        values.Clover.Ticket = false;
      }
    }
    const db = fire.firestore();

    db.collection("Flosting_7")
      .add({
        User: User,
        Lilac: values.Lilac,
        Daisy: values.Daisy,
        Clover: values.Clover,
      })
      .then(() => {
        alert("success");
        setRedirect(true);
      })
      .catch((error) => {
        alert(error.message);
      });
    onSubmitProps.resetForm();
  };

  if (redirect) {
    {
      return <Redirect to="/confirm" />;
    }
  } else {
    return (
      <ThemeProvider theme={Boldtheme}>
        <div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {(formik) => {
              return (
                <Form id="myForm">
                  <Slider {...settings}>
                    <Container>
                      <Fade bottom cascade>
                        <Title>User Info</Title>
                        <img src={submitMain}></img>
                        <p>{ID}님 안녕하세요 </p>
                        <p>신청 할꺼면 오른쪽으로 넘겨라</p>
                      </Fade>
                    </Container>

                    <InputContainer>
                      <Title>Lilac</Title>
                      <img src={lilac} />
                      {/* 라일락 나이 */}
                      <ToggleButton
                        type="button"
                        onClick={handleLilac}
                        color={lilacOn ? "#FFF5DE" : "#C6B4CE"}
                      >
                        {lilacOn ? "신청하기" : "신청취소"}
                      </ToggleButton>
                      {!lilacOn ? (
                        <div>
                          <FormikControl
                            blockSubmit={lilacOn}
                            control="radio"
                            label="상대의 나이를 선택해주세요"
                            name="Lilac.Age"
                            options={ageOptions}
                            disabled={lilacOn}
                          />
                          {/* 학교 선택 */}
                          <FormikControl
                            blockSubmit={lilacOn}
                            control="select"
                            label="학교 선택"
                            name="Lilac.Univ"
                            options={desiredUnivOptions}
                            disabled={lilacOn}
                          />{" "}
                        </div>
                      ) : (
                        ""
                      )}
                    </InputContainer>
                    <InputContainer>
                      <Title>Daisy</Title>
                      <img src={daisy} />
                      {/* 라일락 나이 */}
                      <ToggleButton
                        type="button"
                        onClick={handleDaisy}
                        color={daisyOn ? "#FFF5DE" : "#C6B4CE"}
                      >
                        {daisyOn ? "신청하기" : "신청취소"}
                      </ToggleButton>
                      {!daisyOn ? (
                        <div>
                          <FormikControl
                            blockSubmit={daisyOn}
                            control="radio"
                            label="상대의 나이를 선택해주세요"
                            name="Daisy.Age"
                            options={ageOptions}
                            disabled={daisyOn}
                          />
                          {/* 학교 선택 */}
                          <FormikControl
                            blockSubmit={daisyOn}
                            control="select"
                            label="학교 선택"
                            name="Daisy.Univ"
                            options={desiredUnivOptions}
                            disabled={daisyOn}
                          />
                        </div>
                      ) : (
                        ""
                      )}
                    </InputContainer>
                    <InputContainer>
                      <Title>Clover</Title>
                      <img src={clover} />
                      {/* 게이 나이 */}
                      <ToggleButton
                        type="button"
                        onClick={handleClover}
                        color={cloverOn ? "#FFF5DE" : "#C6B4CE"}
                      >
                        {cloverOn ? "신청하기" : "신청취소"}
                      </ToggleButton>
                      {!cloverOn ? (
                        <div>
                          <FormikControl
                            blockSubmit={cloverOn}
                            id="test"
                            control="radio"
                            label="상대의 나이를 선택해주세요"
                            name="Clover.Age"
                            options={ageOptions}
                            disabled={cloverOn}
                          />
                          {/* 학교 선택 */}
                          <FormikControl
                            blockSubmit={cloverOn}
                            control="select"
                            label="학교 선택"
                            name="Clover.Univ"
                            options={desiredUnivOptions}
                            disabled={cloverOn}
                          />
                        </div>
                      ) : (
                        ""
                      )}
                    </InputContainer>
                    <Container>
                      <Title>마지막!!</Title>
                      <img src={submitMain} />
                      <div>
                        <SubmitButton
                          type="button"
                          onClick={handleClickOpen}
                          color={"#C6B4CE"}
                        >
                          제출하기!!
                        </SubmitButton>
                      </div>
                      <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                      >
                        <DialogTitle id="alert-dialog-title">
                          {"신청하시겠습니까?"}
                        </DialogTitle>
                        <DialogContent>
                          <DialogContentText id="alert-dialog-description">
                            리얼로 신청할꺼임??
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleClose} color="primary">
                            Disagree
                          </Button>
                          <Button
                            form="myForm"
                            type="submit"
                            onClick={handleClose}
                            color="primary"
                            autoFocus
                          >
                            Agree
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </Container>
                  </Slider>
                </Form>
              );
            }}
          </Formik>
        </div>
      </ThemeProvider>
    );
  }
}

export default EnrollmentForm;
