import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "./FormikControl";
import fire from "../../Register/LoginFire";
import { Button } from "@material-ui/core";
import Slider from "react-slick";
import styled from "styled-components";
import img from "../../../../images/FlostingEmo.png";
import "../FormikContainer.css";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
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

  // Slider 세팅 값
  const Wrap = styled.div`
    margin: 1rem;
    text-align: center;
    justify-content: center;

    img {
      align-items: center;
      width: 90%;
      height: 90%;
    }
  `;
  // trigger submit
  const [lilacCheck, setLilacCheck] = useState(false);
  const [daisyCheck, setDaisyCheck] = useState(false);
  const [gayCheck, setGayCheck] = useState(false);
  // trigger handler

  // alert Dialog Message
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => {
          return (
            <Form>
              <Slider {...settings}>
                <Wrap>
                  <h1>본인정보 입력</h1>

                  <img src={img} />

                  <FormikControl
                    control="radio"
                    label="나이를 선택해주세요"
                    name="userAge"
                    options={ageOptions}
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
                  <h1>라일락 입력</h1>
                  <img src={img} />
                  {/* 라일락 나이 */}
                  <FormikControl
                    control="radio"
                    label="상대의 나이를 선택해주세요"
                    name="otherAge.lilac"
                    options={ageOptions}
                  />
                  {/* 학교 선택 */}
                  <FormikControl
                    control="select"
                    label="학교 선택"
                    name="desiredUniv.lilac"
                    options={desiredUnivOptions}
                  />

                  {/* 라일락 티켓 */}
                  <FormikControl
                    control="select"
                    label="LilacTicket"
                    name="ticket.lilac"
                    options={ticketOptions}
                  />
                </Wrap>
                <Wrap>
                  <h1>데이지 입력</h1>
                  <img src={img} />
                  {/* 데이지 티켓 */}
                  <FormikControl
                    control="radio"
                    label="상대의 나이를 선택해주세요"
                    name="otherAge.daisy"
                    options={ageOptions}
                  />
                  {/* 학교 선택 */}
                  <FormikControl
                    control="select"
                    label="학교 선택"
                    name="desiredUniv.daisy"
                    options={desiredUnivOptions}
                  />

                  {/* 데이지 티켓 */}
                  <FormikControl
                    control="select"
                    label="DiasyTicket"
                    name="ticket.daisy"
                    options={ticketOptions}
                  />
                </Wrap>
                <Wrap>
                  <h1>게이 입력</h1>
                  <img src={img} />
                  {/* 게이 나이 */}
                  <FormikControl
                    control="radio"
                    label="상대의 나이를 선택해주세요"
                    name="otherAge.gay"
                    options={ageOptions}
                  />
                  {/* 학교 선택 */}
                  <FormikControl
                    control="select"
                    label="학교 선택"
                    name="desiredUniv.gay"
                    options={desiredUnivOptions}
                  />
                  {/* 게이 티켓 */}
                  <FormikControl
                    control="select"
                    label="GayTicket"
                    name="ticket.gay"
                    options={ticketOptions}
                  />
                </Wrap>
                <Wrap>
                  <h1>마지막 확인</h1>
                  <img src={img} />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleClickOpen}
                    disabled={!formik.isValid}
                  >
                    신청하기!!
                  </Button>
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
                      {"정말로 신청할꺼냐??"}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-slide-description">
                        신청 정보는 ~~ props~~
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose} color="primary">
                        Disagree
                      </Button>

                      <Button
                        onClick={handleClose}
                        color="primary"
                        type="submit"
                      >
                        Agree
                      </Button>
                    </DialogActions>
                  </Dialog>
                  <Button
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
  );
}

export default EnrollmentForm;
