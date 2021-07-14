import React, { useState, useEffect } from "react";
import fire from "../Register/LoginFire";
import styled from "styled-components";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import MannerInfo from "./MannerInfo";
import profile_boy_default from "../../../images/profile_boy_default.png";

const useStyles = makeStyles((theme) => ({
  largeavatar: {
    width: theme.spacing(15),
    height: theme.spacing(15),
    border: "1px solid rgb(0,0,0,0.2)",
  },
}));

const Container = styled.div`
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 400;
  display: flex;
  flex-direction: column;
`;

const NicknameBox = styled.div`
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 400;
  font-size: 2rem;
`;
const MyInfo = (props) => {
  const classes = useStyles();
  const { user } = props;

  const db = fire.firestore();
  const [ID, setID] = useState("");
  const [Nickname, setNickname] = useState("");

  useEffect(() => {
    const s_id = user.email.split("@");
    setID(s_id[0]);
    let Infodb = db.collection("회원정보");
    let query = Infodb.where("ID", "==", s_id[0])
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setNickname(doc.data().User.Nick);
        });
      });
  }, []);

  return (
    <Container>
      <Avatar
        alt={Nickname}
        src={profile_boy_default}
        className={classes.largeavatar}
      />
      <NicknameBox>{Nickname}</NicknameBox>
      <h3>학번</h3>
      {ID}
      <MannerInfo />
    </Container>
  );
};

export default MyInfo;
