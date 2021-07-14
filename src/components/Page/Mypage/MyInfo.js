import React, { useState, useEffect } from 'react';
import fire from '../Register/LoginFire';
import styled from 'styled-components';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import MannerInfo from './MannerInfo';
import TierInfo from './TierInfo';
import profile_boy_default from '../../../images/profile_boy_default.png';

const useStyles = makeStyles((theme) => ({
    largeavatar: {
      width: theme.spacing(15),
      height: theme.spacing(15),
      border: "1px solid rgb(0,0,0,0.2)",
    }
  }));

const Container = styled.div`
    font-family: 'Noto Sans KR', sans-serif;
    font-weight: 400;
    display: flex;
    flex-direction: column;
`;

const NicknameBox = styled.div`
    font-family: 'Noto Sans KR', sans-serif;
    margin-top: 20px;
    padding-top: 10px;
    border-top: 1px solid rgb(0,0,0,0.1);
    font-weight: 400;
    h1{
        font-size: 2rem;
    }
`
const SchoolNumBox = styled.div`
    list-style : none;
    font-family: 'Noto Sans KR', sans-serif;
    .ID{
        font-weight: 400;
        font-size: 1rem;
        color : rgb(0,0,0,0.6);
    }
`
const MyInfo = (props) => {
    const classes = useStyles();
    const {user} = props;

    const db = fire.firestore();
    const [ID, setID] = useState('');
    const [Manner, setManner] = useState('');
    const [Nickname, setNickname] = useState('');
    const [NextTier, setNextTier] = useState('');

    


    useEffect(() => {
        const s_id = user.email.split('@');
        setID(s_id[0]);
        let Infodb = db.collection("회원정보");
        let query = Infodb.where("ID", "==", s_id[0]).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
               setNickname(doc.data().User.Nick);
               let mannertemp = doc.data().User.Manner;
               setManner(mannertemp);
               let Till = Math.ceil(mannertemp / 10) * 10;
               setNextTier(Till - mannertemp);
            });
        });


    }, []);

    return (
        <Container>
            <Avatar alt={Nickname} src={profile_boy_default} className={classes.largeavatar}/>
            <NicknameBox>
                <h1>{Nickname}</h1>
            </NicknameBox>
            <SchoolNumBox>
            <li className = "ID">{ID}</li>
            </SchoolNumBox>
            <MannerInfo Manner = {Manner}/>
            <TierInfo Manner = {Manner} NextTier = {NextTier} />

        </Container>
    );
};

export default MyInfo;