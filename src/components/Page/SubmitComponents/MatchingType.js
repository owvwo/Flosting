import React from "react";
import Checkbox from "@material-ui/core/Checkbox";

const MatchingType = () => {
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  const [checked, setChecked] = React.useState(true);
  return (
    <div>
      <Checkbox
        checked={checked}
        onChange={handleChange}
        inputProps={{ "aria-label": "primary checkbox" }}
      />
    </div>
  );
};

export default MatchingType;
