import React from "react";
import { makeStyles } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { Slider } from "@material-ui/core";
const UserAge = () => {
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

  const useStyles = makeStyles((theme) => ({
    root: {
      width: 300,
    },
    margin: {
      height: theme.spacing(3),
    },
  }));
  function valuetext(value) {
    return `${value}`;
  }
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography id="discrete-slider-always" gutterBottom>
        Always visible
      </Typography>
      <Slider
        defaultValue={80}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider-always"
        step={1}
        marks={marks}
        valueLabelDisplay="on"
        max={30}
        min={20}
      />
    </div>
  );
};

export default UserAge;
