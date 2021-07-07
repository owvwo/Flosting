import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "./FormikControl";
import fire from "../../Register/LoginFire";

function EnrollmentForm() {
  const db = fire.firestore();

  const ticketOptions = [
    { key: "Select your Ticket", value: "" },
    { key: "0", value: "0" },
    { key: "1", value: "1" },
    { key: "2", value: "2" },
  ];

  const ticketTypeOptions = [
    { key: "Lilac", value: "lilac" },
    { key: "Daisy", value: "daisy" },
    { key: "DaisyGay", value: "daisy_gay" },
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
    matchingTypes: [],
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
        matchingTypes: values.matchingTypes,
        otherAge: values.otherAge,
      })
      .then(() => {
        alert("success");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div>
      <h1>참가신청서</h1>
      <h1>이미지</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => {
          return (
            <Form>
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
              {/* 매칭타입 */}
              <FormikControl
                control="checkbox"
                label="MatchingType"
                name="matchingTypes"
                options={ticketTypeOptions}
              />
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
              {/* 데이지 나이 */}
              <FormikControl
                control="radio"
                label="Daisy Age"
                name="otherAge.daisy"
                options={ageOptions}
              />
              {/* 데이지 티켓 */}
              <FormikControl
                control="select"
                label="DaisyTicket"
                name="ticket.daisy"
                options={ticketOptions}
              />
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
              <button type="submit" disabled={!formik.isValid}>
                Submit
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default EnrollmentForm;
