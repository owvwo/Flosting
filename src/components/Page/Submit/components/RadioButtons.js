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
  border-radius: 10px;
  color: #ffffff;
  background-color: #f7bb9e;
  display: inline-block;
  width: 20rem;
`;

const RadioButton = styled.input`
  margin: 1rem;
  width: 1rem;
  height: 1.7rem;
`;

const RadioLabel = styled.label`
  width: 1rem;
  height: 1.7rem;
  font-size: 1rem;
`;

function RadioButtons(props) {
  const { label, name, options, blockSubmit, ...rest } = props;
  return (
    <div className="formik-container">
      <InputLabel>
        <Label>{label}</Label>
      </InputLabel>
      <Field name={name}>
        {({ field }) => {
          return options.map((option) => {
            return (
              <React.Fragment key={option.key}>
                <RadioButton
                  type="radio"
                  id={blockSubmit ? "" : option.value}
                  {...field}
                  {...rest}
                  value={blockSubmit ? "" : option.value}
                  checked={blockSubmit ? false : field.value === option.value}
                />
                <RadioLabel htmlFor={option.value}>{option.key}</RadioLabel>
              </React.Fragment>
            );
          });
        }}
      </Field>
      <ErrorMessage component={TextError} name={name} />
    </div>
  );
}

export default RadioButtons;
