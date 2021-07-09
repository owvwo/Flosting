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

const RadioButton = styled.input`
  width: 1.7rem;
  height: 1.7rem;
`;

const RadioLabel = styled.label`
  width: 1.7rem;
  height: 1.7rem;
  font-size: 1.5rem;
`;

function RadioButtons(props) {
  const { label, name, options, ...rest } = props;
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
                  id={option.value}
                  {...field}
                  {...rest}
                  value={option.value}
                  checked={field.value === option.value}
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
