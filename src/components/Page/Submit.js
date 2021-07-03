import { Formik, Form, Field, ErrorMessage } from "formik";
import React from "react";
import styled, { css } from "styled-components";
import * as Yup from "yup";
import TextError from "./SubmitComponents/TextError";

const Label = styled.label`
  font-weight: bold;
  display: flex;
  margin-bottom: 5px;
`;

const Input = styled.input`
  display: block;
  width: 400px;
  padding: 6px 12px
  font-size: 14px
  line-height:1.42857143;
  color: #555;
  background-color:#fff;
  background-image:none;
  border: 1px solid #ccc;
  border-radius:4px;
  // margin-bottom: 20px;
`;

const FormControl = styled.div`
  margin-bottom: 20px;
`;
const Error = styled.div`
  color: red;
`;

const initialValues = {
  name: "",
  email: "",
  channel: "",
  comments: "",
  address: "",
  social: {
    facebook: "",
    twitter: "",
  },
};

const onSubmit = (values) => {
  console.log("form data", values);
};

const validationSchema = Yup.object({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email format").required("Required"),
  channel: Yup.string().required("Required"),
});

const Submit = () => {
  // console.log("Visited f", formik.touched);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form>
        {/*  자동으로 훅으로 submit 넘겨줌 */}
        <FormControl>
          <Label htmlFor="name">Name</Label>
          {/* Field == input */}
          <Field type="text" id="name" name="name" placeholder="gu"></Field>
          <ErrorMessage name="name" component={TextError} />
        </FormControl>
        <FormControl>
          <Label htmlFor="email">E-mail</Label>
          <Field type="email" id="email" name="email" />
          <ErrorMessage name="email" component={TextError}>
            {/* (errorMsg) => {<Error>{errorMsg}</Error>} */}
          </ErrorMessage>
        </FormControl>
        <FormControl>
          <Label htmlFor="channel">Channel</Label>
          <Field type="text" id="channel" name="channel" />
          <ErrorMessage name="channel" component={TextError} />
        </FormControl>
        <FormControl>
          <Label htmlFor="comments">Comments</Label>
          {/* as로 radio, textarea, select 등 변경가능 */}
          <Field as="textarea" id="comments" name="comments"></Field>
        </FormControl>
        <FormControl>
          <Label htmlFor="address">Address</Label>
          {/* as로 radio, textarea, select 등 변경가능 */}
          <Field as="address">
            {/* {(props) => {
              const { field, form, meta } = props;
              console.log("render props", props);
              return (
                <div>
                  <input type="text" id="address" {...field}></input>
                  {meta.touched && meta.error ? <div>{meta.error}</div> : null}
                </div>
              );
            }} */}
          </Field>
        </FormControl>
        <FormControl>
          <Label htmlFor="facebook">Facebook profile</Label>
          <Field type="text" id="facebook" name="social.facebook" />
        </FormControl>
        <FormControl>
          <Label htmlFor="twiiter">Twitter profile</Label>
          <Field type="text" id="twiiter" name="social.twitter" />
        </FormControl>
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

export default Submit;
