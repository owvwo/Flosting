import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import styled from "styled-components";
import NoticeItem from "./NoticeItem";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    margin: 0,
  },
}));

function NoticeList(props) {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      <NoticeItem Title="승훈 화청" Date="7.26"></NoticeItem>
      <NoticeItem Title="정부 소개팅" Date="7.25"></NoticeItem>
      <NoticeItem Title="왕발 휴가 종료" Date="7.22"></NoticeItem>
      <NoticeItem Title="왕발 휴가 시작" Date="7.21"></NoticeItem>
      <NoticeItem Title="f5 버그 픽스" Date="7.14"></NoticeItem>
    </List>
  );
}

export default NoticeList;
