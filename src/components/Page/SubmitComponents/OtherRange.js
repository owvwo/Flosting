import { Slider } from "@material-ui/core";
import { useState } from "react";
import React from "react";

const OtherRange = () => {
  const marks = [
    {
      value: 20,
    },
    {
      value: 21,
    },
    {
      value: 22,
    },
    {
      value: 23,
    },
    {
      value: 24,
    },
    {
      value: 25,
    },
    {
      value: 26,
    },
    {
      value: 27,
    },
    {
      value: 28,
    },
    {
      value: 29,
    },
  ];
  const [lilacAgeValue, setLilacAgeValue] = useState([20, 29]);

  const updateLilacRange = (event, newValue) => {
    setLilacAgeValue(newValue);
  };
  return (
    <div>
      <Slider
        value={lilacAgeValue}
        onChange={updateLilacRange}
        min={20}
        max={29}
        valueLabelDisplay="on"
        marks={marks}
        p={3}
      ></Slider>
    </div>
  );
};

export default OtherRange;
