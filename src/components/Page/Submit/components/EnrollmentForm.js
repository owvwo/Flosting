import React, { useCallback, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "./FormikControl";
import fire from "../../Register/LoginFire";
import { Button } from "@material-ui/core";
import Slider from "react-slick";
import styled from "styled-components";
import img from "../../../../images/flosting-logo.png";
// import female from "../../../../images/flosting-logo.png";
// import male from "../../../../images/flosting-logo.png";
import "../FormikContainer.css";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { Redirect } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";

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

const Wrap = styled.div`
  margin: 1rem;
  text-align: center;
  justify-content: center;
  img {
    width: 10rem;
    height: 10rem;
    display: block;
    margin: 0px auto;
  }
`;
const SubmitButton = styled.button`
  margin-top: 15rem;
  text-align: center;
  justify-content: center;
  height: 5rem;
  width: 15rem;
  border-radius: 5px;
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 700;
  padding: 10px 15px;
  background-color: #e0bcc1;
  color: #ffffff;
  font-size: 2rem;
`;

const Title = styled.h1`
  fontfamily: "Noto Sans KR", sans-serif;
  font-size: xx-large;
  color: #e0bcc1;
`;
const ToggleButton = styled.button`
  fontfamily: "Noto Sans KR", sans-serif;
  border-radius: 5px;
  margin-left: 10.5rem;
  padding: 10px 15px;
  display: inline-block;
  width: 10rem;
  background-color: ${(props) => props.color};
`;

function useToggle(initialValue = true, values) {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => {
    setValue((v) => !v);
  }, []);

  return [value, toggle];
}

function EnrollmentForm() {
  const ticketOptions = [
    { key: "", value: "" },
    { key: "0", value: "0" },
    { key: "1", value: "1" },
    { key: "2", value: "2" },
    { key: "3", value: "3" },
  ];

  const sexOptions = [
    { key: "Girl", value: "girl" },
    { key: "Boy", value: "boy" },
  ];

  const userAgeOptions = [
    { key: "", value: "" },
    { key: "20", value: "20" },
    { key: "21", value: "21" },
    { key: "22", value: "22" },
    { key: "23", value: "23" },
    { key: "24", value: "24" },
    { key: "25", value: "25" },
    { key: "26+", value: "26" },
  ];

  const ageOptions = [
    { key: "20", value: "20" },
    { key: "21~23", value: "21~23" },
    { key: "24+", value: "24+" },
  ];

  const desiredUnivOptions = [
    { key: "", value: "" },
    { key: "우리학교만", value: "myUniv" },
    { key: "타학교만", value: "otherUniv" },
    { key: "상관없음", value: "dnt_M" },
  ];
  // props
  const initialValues = {
    userAge: "",
    userSex: "",
    ticket: {
      lilac: "",
      daisy: "",
      gay: "",
    },
    otherAge: {
      lilac: "",
      daisy: "",
      gay: "",
    },
    desiredUniv: {
      lilac: "",
      daisy: "",
      gay: "",
    },
  };

  // 신청페이지 활성화
  const [lilacOn, setLilacOn] = useToggle();
  const [daisyOn, setDaisyOn] = useToggle();
  const [gayOn, setGayOn] = useToggle();

  // const handleGay = () => {
  //   lialcEnable: !setGayEnable();
  // };
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

  // 유효성 검사
  const validationSchema = Yup.object({
    userAge: Yup.string().required("Required"),
    userSex: Yup.string().required("Required"),
  });

  // 데이터 베이스
  const db = fire.firestore();
  // Submit Handler
  const onSubmit = (values) => {
    console.log("Form data", values);
    db.collection("Flosting_7")
      .add({
        userAge: values.userAge,
        userSex: values.userSex,
        ticket: values.ticket,
        otherAge: values.otherAge,
        desiredUniv: values.desiredUniv,
      })
      .then(() => {
        alert("success");
        setRedirect(true);
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  // 슬라이더 세팅
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  // 확인창
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  if (redirect) {
    {
      return <Redirect to="/confirm" />;
    }
  }

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
                  <Wrap>
                    <Title>User Info</Title>
                    <div>
                      <img src={img} />
                    </div>
                    <FormikControl
                      control="select"
                      label="나이를 선택해주세요"
                      name="userAge"
                      options={userAgeOptions}
                    />

                    {/* 유저 성별 */}
                    <FormikControl
                      control="radio"
                      label="성별을 선택해 주세요"
                      name="userSex"
                      options={sexOptions}
                    />
                  </Wrap>
                  <Wrap>
                    <Title>Lilac</Title>
                    <img src={img} />
                    {/* 라일락 나이 */}
                    <FormikControl
                      control="radio"
                      label="상대의 나이를 선택해주세요"
                      name="otherAge.lilac"
                      options={ageOptions}
                      disabled={lilacOn}
                    />
                    {/* 학교 선택 */}
                    <FormikControl
                      control="select"
                      label="학교 선택"
                      name="desiredUniv.lilac"
                      options={desiredUnivOptions}
                      disabled={lilacOn}
                    />

                    {/* 라일락 티켓 */}
                    <FormikControl
                      control="select"
                      label="LilacTicket"
                      name="ticket.lilac"
                      options={ticketOptions}
                      disabled={lilacOn}
                    />
                    <ToggleButton type="button" onClick={setLilacOn}>
                      {lilacOn ? "신청하기" : "신청안하기"}
                    </ToggleButton>
                  </Wrap>
                  <Wrap>
                    <Title>Daisy</Title>
                    <img src={img} />
                    {/* 데이지 티켓 */}
                    <FormikControl
                      control="radio"
                      label="상대의 나이를 선택해주세요"
                      name="otherAge.daisy"
                      options={ageOptions}
                      disabled={daisyOn}
                    />
                    {/* 학교 선택 */}
                    <FormikControl
                      control="select"
                      label="학교 선택"
                      name="desiredUniv.daisy"
                      options={desiredUnivOptions}
                      disabled={daisyOn}
                    />

                    {/* 데이지 티켓 */}
                    <FormikControl
                      control="select"
                      label="DiasyTicket"
                      name="ticket.daisy"
                      options={ticketOptions}
                      disabled={daisyOn}
                    />
                    <ToggleButton type="button" onClick={setDaisyOn}>
                      {daisyOn ? "신청하기" : "신청안하기"}
                    </ToggleButton>
                  </Wrap>
                  <Wrap>
                    <Title>Gay</Title>
                    <img src={img} />
                    {/* 게이 나이 */}
                    <FormikControl
                      control="radio"
                      label="상대의 나이를 선택해주세요"
                      name="otherAge.gay"
                      options={ageOptions}
                      disabled={gayOn}
                    />
                    {/* 학교 선택 */}
                    <FormikControl
                      control="select"
                      label="학교 선택"
                      name="desiredUniv.gay"
                      options={desiredUnivOptions}
                      disabled={gayOn}
                    />
                    {/* 게이 티켓 */}
                    <FormikControl
                      control="select"
                      label="GayTicket"
                      name="ticket.gay"
                      options={ticketOptions}
                      disabled={gayOn}
                    />
                    <ToggleButton
                      type="button"
                      onClick={setGayOn}
                      color={gayOn ? "red" : "blue"}
                    >
                      {gayOn ? "신청하기" : "신청안하기"}
                    </ToggleButton>
                  </Wrap>
                  <Wrap>
                    <Title>마지막!!</Title>
                    <SubmitButton
                      variant="contained"
                      color="primary"
                      onClick={handleClickOpen}
                    >
                      제출하기!!
                    </SubmitButton>
                    <div>
                      {formik.isValid === false ? (
                        <div className="error">필수항목을 입력해주세요</div>
                      ) : (
                        ""
                      )}
                    </div>
                    {/* <Dialog
                      open={open}
                      TransitionComponent={Transition}
                      keepMounted
                      onClose={handleClose}
                    >
                      <DialogTitle id="alert-dialog-slide-title">
                        {"Alert"}
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                          정말 신청할꺼냐?
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleClose} color="primary">
                          Disagree
                        </Button>
                        <Button
                          form="myForm"
                          variant="contained"
                          color="primary"
                          // type="submit"
                          // disabled={!formik.isValid}
                        >
                          Submit
                        </Button>
                      </DialogActions>
                    </Dialog> */}
                    {/* <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      disabled={!formik.isValid}
                    >
                      Submit
                    </Button> */}
                  </Wrap>
                </Slider>
              </Form>
            );
          }}
        </Formik>
      </div>
    </ThemeProvider>
  );
}

export default EnrollmentForm;
