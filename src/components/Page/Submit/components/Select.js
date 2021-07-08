import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";
import { InputLabel } from "@material-ui/core";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import "../FormikContainer.css";
const field = {
  backgroundcolor: "Black",
  width: "100%",
};

function Select(props) {
  const { label, name, options, ...rest } = props;
  return (
    <div className="formik-control">
      <InputLabel htmlFor={name}>{label}</InputLabel>
      <Field as="select" id={name} name={name} styled={field} {...rest}>
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
