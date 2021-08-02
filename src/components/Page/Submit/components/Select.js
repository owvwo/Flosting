import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";
import { InputLabel } from "@material-ui/core";
import "../FormikContainer.css";
import styled from "styled-components";

const Label = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 700;
  font-size: 1.2rem;
  border: 1px solid rgb(242,236,218, 1);
  width : 20rem;
  height : 2rem;
  margin-bottom: 10px;
  padding: 5px;
  border-radius: 10px;
  color: rgb(0,0,0, 0.5);
  background-color: rgb(242,236,218, 0.8);

`;
const FormikContainer = styled.div`
  display: flex;
  flex-direction : column;
  align-items: center;
  justify-content: center;
`
function Select(props) {
  const { blockSubmit, label, name, options, ...rest } = props;
  return (
    <FormikContainer>
      <Label>{label}</Label>
      <Field as="select" id={name} name={name} {...rest}>
        {options.map((option) => {
          return (
            <option key={option.value} value={option.value}>
              {option.key}
            </option>
          );
        })}
      </Field>

      <ErrorMessage component={TextError} name={name} />
  </FormikContainer>
  );
}

export default Select;
