import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";
import { InputLabel } from "@material-ui/core";
import "../FormikContainer.css";
import styled from "styled-components";

const Label = styled.label`
  font-family: "Lobster", cursive;
  font-size: 25px;
  border: 1.5px solid;
  padding: 5px;
  margin: 5px;
  border-radius: 5px;
  color: #ffffff;
  background-color: #e0bcc1;
  display: inline-block;
  width: 20rem;
`;

function Select(props) {
  const { blockSubmit, label, name, options, ...rest } = props;
  return (
    <div className="formik-control">
      <InputLabel htmlFor={name}>
        <Label>{label}</Label>
      </InputLabel>
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
    </div>
  );
}

export default Select;
