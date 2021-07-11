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
import Slide from "@material-ui/core/Slide";
import { Redirect } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import Fade from "react-reveal/Fade";
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

const Container = styled.div`
  fontfamily: "Noto Sans KR", sans-serif;
  margin: 1rem;
  text-algin: center;
  justify-content: center;
  img {
    width: 20rem;
    margin: 0px auto;
  }
  p {
    inline: block;
    margin: 1em;
    text-align: center;
    font-size: x-large;
    length: 2rem;
  }
`;

function useToggle(initialValue = true, values) {
  const [value, setValue] = useState(initialValue);
  const toggle = useCallback(() => {
    setValue((v) => !v);
  }, []);

  return [value, toggle];
}

function EnrollmentForm(props) {
  const ticketOptions = [
    { key: "", value: "" },
    { key: "0", value: "0" },
    { key: "1", value: "1" },
    { key: "2", value: "2" },
    { key: "3", value: "3" },
  ];

  // const sexOptions = [
  //   { key: "Girl", value: "girl" },
  //   { key: "Boy", value: "boy" },
  // ];

  // const userAgeOptions = [
  //   { key: "", value: "" },
  //   { key: "20", value: "20" },
  //   { key: "21", value: "21" },
  //   { key: "22", value: "22" },
  //   { key: "23", value: "23" },
  //   { key: "24", value: "24" },
  //   { key: "25", value: "25" },
  //   { key: "26+", value: "26" },
  // ];

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
    // userAge: "",
    // userSex: "",
    ticket: {
      lilac: "",
      daisy: "",
      clover: "",
    },
    otherAge: {
      lilac: "",
      daisy: "",
      clover: "",
    },
    desiredUniv: {
      lilac: "",
      daisy: "",
      clover: "",
    },
  };
  // 신청자 정보

  const { set_S_num, set_S_name, set_auth_regis } = props;
  // 신청페이지 활성화
  const [lilacOn, setLilacOn] = useToggle();
  const [daisyOn, setDaisyOn] = useToggle();
  const [cloverOn, setCloverOn] = useToggle();
  const [inputLilac, setInputLilac] = useState("");

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
    // userAge: Yup.string().required("필수항목을 입력해주세요"),
    // userSex: Yup.string().required("필수항목을 입력해주세요"),
  });

  // 데이터 베이스
  const db = fire.firestore();
  // Submit Handler
  const onSubmit = (values) => {
    console.log("Form data", values);
    db.collection("Flosting_7")
      .add({
        // userAge: values.userAge,
        // userSex: values.userSex,
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
    arrow: true,
    dots: true,
    dotClass: "slick-dots",
    draggable: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    margin: 0,
    outline: "none",
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

  const onChangeInput = (e) => {
    // const test = useRef(false);
  };
  const onReset = () => {
    setInputLilac("");
  };
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
                      <p>~~~ 님 안녕하세요 </p>
                      <p>신청 할꺼면 오른쪽으로 넘겨라</p>
                    </Fade>
                  </Container>

                  {/* <Wrap>
                    <Title>User Info</Title>
                    <div>
                      <img src={userInfo} />
                    </div>
                    <FormikControl
                      control="select"
                      label="나이를 선택해주세요"
                      name="userAge"
                      options={userAgeOptions}
                    />

                    유저 성별
                    <FormikControl
                      control="radio"
                      label="성별을 선택해 주세요"
                      name="userSex"
                      options={sexOptions}
                    />
                  </Wrap> */}
                  <InputContainer>
                    <Title>Lilac</Title>
                    <img src={lilac} />

                    {/* 라일락 나이 */}
                    <ToggleButton
                      type="button"
                      onClick={setLilacOn}
                      color={lilacOn ? "#FFF5DE" : "#C6B4CE"}
                    >
                      {lilacOn ? "신청하기" : "신청취소"}
                    </ToggleButton>

                    <FormikControl
                      control="radio"
                      label="상대의 나이를 선택해주세요"
                      name="otherAge.lilac"
                      options={ageOptions}
                      disabled={lilacOn}
                      onChangeInput
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
                    {/* <FormikControl
                      control="select"
                      label="LilacTicket"
                      name="ticket.lilac"
                      options={ticketOptions}
                      disabled={lilacOn}
                    /> */}
                  </InputContainer>
                  <InputContainer>
                    <Title>Daisy</Title>
                    <img src={daisy} />
                    {/* 데이지 티켓 */}
                    <ToggleButton
                      type="button"
                      onClick={setDaisyOn}
                      color={daisyOn ? "#FFF5DE" : "#C6B4CE"}
                    >
                      {daisyOn ? "신청하기" : "신청취소"}
                    </ToggleButton>
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
                    {/* <FormikControl
                      control="select"
                      label="DiasyTicket"
                      name="ticket.daisy"
                      options={ticketOptions}
                      disabled={daisyOn}
                    /> */}
                  </InputContainer>
                  <InputContainer>
                    <Title>Clover</Title>
                    <img src={clover} />
                    {/* 게이 나이 */}
                    <ToggleButton
                      type="button"
                      onClick={setCloverOn}
                      color={cloverOn ? "#FFF5DE" : "#C6B4CE"}
                    >
                      {cloverOn ? "신청하기" : "신청취소"}
                    </ToggleButton>
                    <FormikControl
                      control="radio"
                      label="상대의 나이를 선택해주세요"
                      name="otherAge.clover"
                      options={ageOptions}
                      disabled={cloverOn}
                    />
                    {/* 학교 선택 */}
                    <FormikControl
                      control="select"
                      label="학교 선택"
                      name="desiredUniv.clover"
                      options={desiredUnivOptions}
                      disabled={cloverOn}
                    />
                    {/* 게이 티켓 */}
                    {/* <FormikControl
                      control="select"
                      label="CloverTicket"
                      name="ticket.clover"
                      options={ticketOptions}
                      disabled={cloverOn}
                    /> */}
                  </InputContainer>
                  <Container>
                    <Title>마지막!!</Title>
                    <img src={submitMain} />
                    <div>
                      <SubmitButton
                        type="button"
                        onClick={handleClickOpen}
                        // disabled={!formik.isValid}
                        // color={!formik.isValid ? "#423F3E" : "#C6B4CE"}
                        color={"#C6B4CE"}
                      >
                        제출하기!!
                      </SubmitButton>
                    </div>
                    {/* <div>
                      {formik.isValid === false ? (
                        <div className="error" style={{ display: "block" }}>
                          필수항목을 입력해주세요
                        </div>
                      ) : (
                        ""
                      )}
                    </div> */}
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

export default EnrollmentForm;
