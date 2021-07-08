import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "./FormikControl";
import fire from "../../Register/LoginFire";
import { Button } from "@material-ui/core";
import Slider from "react-slick";
import styled from "styled-components";
import img from "../../../../images/FlostingEmo.png";
function EnrollmentForm() {
  const ticketOptions = [
    { key: "티켓을 선택하세요", value: "" },
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
    { key: "학교 선택", value: "" },
    { key: "우리학교만", value: "myUniv" },
    { key: "타학교만", value: "otherUniv" },
    { key: "상관없음", value: "dnt_M" },
  ];
  // props
  const initialValues = {
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
    desiredUniv: {
      lilac: "",
      daisy: "",
      gay: "",
    },
  };
  // 유효성 검사
  const validationSchema = Yup.object({
    // nicName: Yup.string().required("Required"),
    // sex: Yup.string().required("Required"),
  });

  // 데이터 베이스
  const db = fire.firestore();

  const onSubmit = (values) => {
    console.log("Form data", values);
    db.collection("Flosting_7")
      .add({
        userAge: values.userAge,
        sex: values.sex,
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
    h3 {
      text-align: center;
    }
    img {
      align-items: center;
      width: 100%;
      height: 100%;
    }
  `;
  const Container = styled.div`
    margin: 1rem;
    text-align: center;
    h3 {
      text-align: center;
    }
    img {
      align-items: center;
      width: 100%;
      height: 100%;
    }
  `;
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
                  <img src={img} />
                  {/* 유저 나이 */}
                  {/* <label>hi</label> */}
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
                    name="sex"
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
                    label="상대방 학교 선택"
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
                    label="상대방 학교 선택"
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
                    label="상대방 학교 선택"
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
