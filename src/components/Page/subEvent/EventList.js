import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import EventItem from "./EventItem";
import EventImg from "../../../images/SubEventImg.png";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    margin: 0,
  },
}));

function EventList(props) {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      <EventItem
        Img={EventImg}
        Title="오픈 기념 이벤트"
        Date="2021.07.26 - 08.26"
      ></EventItem>
      {/* <EventItem
        Img={EventImg}
        Title="오픈 기념 이벤트"
        Date="2021.08.20 - 09.31"
      ></EventItem>
      <EventItem
        Img={EventImg}
        Title="왕코 행님"
        Date="2021.06.20 - 10.31"
      ></EventItem>
      <EventItem
        Img={EventImg}
        Title="왕코 행님"
        Date="2021.06.20 - 10.31"
      ></EventItem>
      <EventItem
        Img={EventImg}
        Title="왕코 행님"
        Date="2021.06.20 - 10.31"
      ></EventItem> */}
    </List>
  );
}

export default EventList;