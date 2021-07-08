import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "./FormikControl";
import fire from "../../Register/LoginFire";
import { Button } from "@material-ui/core";
import Slider from "react-slick";
import styled from "styled-components";
function EnrollmentForm() {
  const db = fire.firestore();

  const ticketOptions = [
    { key: "Select your Ticket", value: "" },
    { key: "0", value: "0" },
    { key: "1", value: "1" },
    { key: "2", value: "2" },
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

  const initialValues = {
    nicName: "",
    userAge: "",
    sex: "",
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
  };

  const validationSchema = Yup.object({
    // nicName: Yup.string().required("Required"),
    // ticket: Yup.string().required("Required"),
    // sex: Yup.string().required("Required"),
    // ticket: Yup.string().required("Required"),
  });

  const onSubmit = (values) => {
    console.log("Form data", values);
    db.collection("Flosting_7")
      .add({
        nicName: values.nicName,
        userAge: values.userAge,
        sex: values.sex,
        ticket: values.ticket,
        otherAge: values.otherAge,
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

  // 사용자 정보 입력
  const Wrap = styled.div`
    margin: 1rem;
    text-align: center;
    h3 {
      text-align: center;
    }
  `;

  // 라일락 정보 입력
  // 데이지 정보 입력
  // 게이 정보 입력
  return (
    <div>
      <h1>참가신청서</h1>

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
                  <h1>이미지</h1>
                  {/* 닉네임 */}
                  <FormikControl
                    control="input"
                    type="text"
                    label="NicName"
                    name="nicName"
                  />
                  {/* 유저 나이 */}
                  <FormikControl
                    control="radio"
                    label="Choose your age"
                    name="userAge"
                    options={ageOptions}
                  />
                  {/* 유저 성별 */}
                  <FormikControl
                    control="radio"
                    label="Choose your Sex"
                    name="sex"
                    options={sexOptions}
                  />
                </Wrap>
                <Wrap>
                  <h1>라일락 입력</h1>
                  <h1>이미지</h1>
                  {/* 라일락 나이 */}
                  <FormikControl
                    control="radio"
                    label="Lilac Age"
                    name="otherAge.lilac"
                    options={ageOptions}
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
                  <h1>이미지</h1>
                  {/* 데이지 티켓 */}
                  <FormikControl
                    control="radio"
                    label="Daisy Age"
                    name="otherAge.daisy"
                    options={ageOptions}
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
                  <h1>이미지</h1>
                  {/* 게이 나이 */}
                  <FormikControl
                    control="radio"
                    label="Gay age"
                    name="otherAge.gay"
                    options={ageOptions}
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
                  <h1>이미지</h1>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={!formik.isValid}
                  >
                    Submit
                  </Button>
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
