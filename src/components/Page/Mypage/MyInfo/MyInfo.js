import React, { useState, useEffect } from "react";
import fire from "../../Register/LoginFire";
import Badge from '@material-ui/core/Badge';
import styled from "styled-components";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import MannerInfo from "./MannerInfo";
import TierInfo from "./TierInfo";
import MbtiInfo from "./MbtiInfo";
import profile_boy_default from "../../../../images/profile_boy_default.png";

const SmallAvatar = withStyles((theme) => ({
  root: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    border: `2px solid ${theme.palette.background.paper}`,
  },
}))(Avatar);

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
  h1 {
    font-size: 2rem;
  }
`;
const SchoolNumBox = styled.div`
  list-style: none;
  font-family: "Noto Sans KR", sans-serif;
  .ID {
    font-weight: 400;
    font-size: 1rem;
    color: rgb(0, 0, 0, 0.8);
  }
  .School {
    font-weight: 400;
    font-size: 0.8rem;
    color: rgb(0, 0, 0, 0.8);
  }
  .Age {
    font-weight: 400;
    font-size: 0.8rem;
    color: rgb(0, 0, 0, 0.8);
  }
`;

const FlexRowbox = styled.div`
  display: flex;
  flex-direction : row;
`
const FlexColumnbox = styled.div`
  display: flex;
  flex-direction : column;
  margin: 0px 10px;
`

const MyInfo = (props) => {
  const classes = useStyles();
  const user = props.user;
  const db = fire.firestore();
  const [ID, setID] = useState("");
  const [Univ, setUniv] = useState("");
  const [RealName, setRealName] = useState("");
  const [Manner, setManner] = useState("");
  const [Nickname, setNickname] = useState("");
  const [NextTier, setNextTier] = useState("");
  const [Mbti, setMbti] = useState("");
  const [Age,setAge] = useState(19);

  useEffect(() => {
    if (user) {
      let s_id = user.email.split("@");
      setID(s_id[0]);
      let Infodb = db.collection("회원정보");
      let query = Infodb.where("ID", "==", s_id[0])
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            setNickname(doc.data().User.Nick);
            setRealName(doc.data().User.Name);
            setUniv(doc.data().User.Univ);
            setAge(doc.data().User.Age);
            setMbti(doc.data().User.Mbti);
            let mannertemp = doc.data().User.Manner;
            setManner(mannertemp);
            let Till = Math.ceil(mannertemp / 10) * 10;
            setNextTier(Till - mannertemp);
          });
        });
    }
  }, [user]);

  return (
    <Container>
      <FlexRowbox>
      <Badge
        overlap="circular"
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        
        badgeContent={<SmallAvatar alt="Remy Sharp" src={require('../../../../images/Age/Age_'+ Age +'.png').default} />}
      >
        <Avatar
          alt={Nickname}
          src={profile_boy_default}
          className={classes.largeavatar}
        />
        </Badge>
        <FlexColumnbox>
          <SchoolNumBox>
            <li className="ID">{RealName}[{ID}]</li>
          </SchoolNumBox>
          <NicknameBox>
            <h1>{Nickname}</h1>
          </NicknameBox>
          <SchoolNumBox>
            <li className="School">{Univ}</li>
          </SchoolNumBox>
        </FlexColumnbox>
      </FlexRowbox>
      <MannerInfo Manner={Manner} />
      <MbtiInfo Mbti = {Mbti}></MbtiInfo>
      <TierInfo Manner={Manner} NextTier={NextTier} />
    </Container>
  );
};

export default MyInfo;
