import { useFormik } from "formik";
import React from "react";
import styled, { css } from "styled-components";
import * as Yup from "yup";

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
};

const onSubmit = (values) => {
  console.log("form data", values);
};

const validate = (values) => {
  let errors = {};

  if (!values.name) {
    errors.name = "Requried";
  }

  if (!values.email) {
    errors.email = "Requried";
  } else if (
    !/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i.test(
      values.email
    )
  ) {
    errors.email = "Invalid email format";
  }

  if (!values.channel) {
    errors.channel = "Requried";
  }

  return errors;
};
const validationSchema = Yup.object({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email format").required("Required"),
  channel: Yup.string().required("Required"),
});

const OldSubmit = () => {
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });
  console.log("Visited fields", formik.touched);

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <FormControl>
          <Label htmlFor="name">Name</Label>
          <Input
            type="text"
            id="name"
            name="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          ></Input>
          {formik.touched.name && formik.errors.name ? (
            <Error>{formik.errors.name}</Error>
          ) : null}
        </FormControl>
        <FormControl>
          <Label htmlFor="email">E-mail</Label>
          <Input
            type="email"
            id="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          ></Input>
          {formik.touched.email && formik.errors.email ? (
            <Error>{formik.errors.email}</Error>
          ) : null}
        </FormControl>
        <FormControl>
          <Label htmlFor="channel">Channel</Label>
          <Input
            type="text"
            id="channel"
            name="channel"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.channel}
          ></Input>
          {formik.touched.channel && formik.errors.channel ? (
            <Error>{formik.errors.channel}</Error>
          ) : null}
        </FormControl>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default OldSubmit;
