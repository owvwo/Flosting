import React from "react";
// import Input from "./Input";
import Select from "./Select";
import RadioButtons from "./RadioButtons";

// import CheckboxGroup from "./CheckboxGroup";

function FormikControl(props) {
  const { blockSubmit, control, ...rest } = props;

  switch (control) {
    // case "input":
    //   return <Input {...rest} />;
    case "select":
      return <Select blockSubmit={blockSubmit} {...rest} />;
    case "radio":
      return <RadioButtons blockSubmit={blockSubmit} {...rest} />;
    // case "checkbox":
    //   return <CheckboxGroup {...rest} />;
    default:
      return null;
  }
}

export default FormikControl;
