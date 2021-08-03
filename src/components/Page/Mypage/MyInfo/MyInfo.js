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

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
const db = fire.firestore();
const storage = fire.storage();
const storageRef = storage.ref();
const inputStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  },
}));


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
  const [ProfileImage, setProfileImage] = useState("");
  const [Univ, setUniv] = useState("");
  const [RealName, setRealName] = useState("");
  const [Manner, setManner] = useState("");
  const [Nickname, setNickname] = useState("");
  const [NextTier, setNextTier] = useState("");
  const [Mbti, setMbti] = useState("");
  const [Age,setAge] = useState(19);
  const [프사,프사변경] = useState(null);
  const [회원정보docId,회원정보docId변경] = useState();
  const [imgBase64, setImgBase64] = useState("");

  useEffect(() => {
    if (user) {
      let s_id = user.email.split("@");
      setID(s_id[0]);
      let Infodb = db.collection("회원정보");
      let query = Infodb.where("ID", "==", s_id[0])
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            회원정보docId변경(doc.id)
            setProfileImage(doc.data().profileImage)
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
          src={ProfileImage}
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
      <UploadProfileImage 프사변경={프사변경} 프사={프사} user={user} 회원정보docId={회원정보docId} imgBase64={imgBase64} setImgBase64={setImgBase64} />
    </Container>
  );
};

export default MyInfo;



function UploadProfileImage(props) {

  const classes = inputStyles();
  const date = new Date();

  async function onSubmit (event){
    event.preventDefault();
    const uploadTask = storageRef.child(`profileImage/${props.user.uid}/${date}`).put(props.프사)
    uploadTask.then((snapshot)=>{
      snapshot.ref.getDownloadURL().then((downloadURL)=>{
        console.log(downloadURL)
        db.collection('회원정보').doc(props.회원정보docId).update(
          {"profileImage": downloadURL}
        ).then(
          alert('프로필 사진 변경 성공! 새로고침 해주세요!')
          )
      })
    })
  }  
  
  function onChange(e){
    let reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      if (base64) {
        props.setImgBase64(base64.toString()); 
      }
    }
    if(e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]); 
      props.프사변경(e.target.files[0])
    }
  }

  return (
    <div className={classes.root}>
      <input className={classes.input} id="icon-button-file" type="file" accept=".gif, .jpg, .png"
        onChange={onChange}
    />
      <label htmlFor="icon-button-file">
        <IconButton color="primary" aria-label="upload picture" component="span">
          <PhotoCamera />
        </IconButton>
      </label>
      {
        props.프사 === null
        ?
        <div></div>
        :
        <label htmlFor="contained-button-file">
          <Button variant="contained" color="primary" component="span" onClick={onSubmit}>
            저장하기
          </Button>
        <div>
          <Avatar style={{"width":"150px", "height" : "150px", "border": "1px solid grey"}} src={props.imgBase64}/>
        </div>
        </label>
      }      
    </div>
  );
}