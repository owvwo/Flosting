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
<<<<<<< HEAD
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 700;
  font-size: 1.2rem;
  border: 1px solid rgb(242, 236, 218, 1);
  width: 20rem;
  height: 2rem;
  padding: 5px;
  border-radius: 10px;
  color: rgb(0, 0, 0, 0.5);
  background-color: rgb(242, 236, 218, 0.8);
`;
const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Noto Sans KR", sans-serif;
  font-size: 0.8rem;
`;

const RadioButton = styled.input`
  width: 25px;
  height: 25px;
}
`;
const FormikContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const FieldBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 0.5rem;
`;
=======
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 700;
  font-size: 1.2rem;
  border: 1px solid rgb(242,236,218, 1);
  width : 20rem;
  height : 2rem;
  padding: 5px;
  border-radius: 10px;
  color: rgb(0,0,0, 0.5);
  background-color: rgb(242,236,218, 0.8);

`;
const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Noto Sans KR', sans-serif;
  font-size : 0.8rem;
  
`;

const RadioButton = styled.input`
  width: 25px;
  height: 25px;
}
`;
const FormikContainer = styled.div`
  display: flex;
  flex-direction : column;
  align-items: center;
  justify-content: center;
`
const FieldBox = styled.div`
  display: flex;
  flex-direction : row;
  align-items: center;
  justify-content: center;
  margin-top : 0.5rem;
`
>>>>>>> d297d1f96bfadde0ea876a169b60189a98b4c75a
function RadioButtons(props) {
  const { label, name, options, blockSubmit, ...rest } = props;
  return (
    <FormikContainer>
      <Label>{label}</Label>
      <FieldBox>
        <Field name={name}>
<<<<<<< HEAD
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
                    defaultChecked
                  />
                  <RadioLabel htmlFor={option.value}>{option.key}</RadioLabel>
                </React.Fragment>
              );
            });
          }}
        </Field>
=======
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
>>>>>>> d297d1f96bfadde0ea876a169b60189a98b4c75a
      </FieldBox>
      <ErrorMessage component={TextError} name={name} />
    </FormikContainer>
  );
}

export default RadioButtons;
