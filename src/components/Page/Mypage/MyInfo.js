import React, { useState, useEffect } from 'react';
import fire from '../Register/LoginFire';
import styled from 'styled-components';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import MannerInfo from './MannerInfo';

const useStyles = makeStyles((theme) => ({
    largeavatar: {
      width: theme.spacing(15),
      height: theme.spacing(15),
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
    font-weight: 400;
    font-size: 2rem;
`
const MannerContainer = styled.div`
    border-top: 1px solid rgb(0,0,0,0.1);
    margin-top: 20px;
`
const MannerBox = styled.button`
    margin-top: 5px;

    font-size : 0.8rem;
    border : none;
    text-decoration: underline;
    width: 100px;
    background : white;

`
const MyInfo = (props) => {
    const classes = useStyles();
    const {user} = props;

    const db = fire.firestore();
    const [ID, setID] = useState('');
    const [Nickname, setNickname] = useState('');

    


    useEffect(() => {
        const s_id = user.email.split('@');
        setID(s_id[0]);

        let Infodb = db.collection("회원정보");
        let query = Infodb.where("ID", "==", s_id[0]).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                setNickname(doc.data().Nickname);
            });
        });

    }, []);

    return (
        <Container>
            <Avatar alt={Nickname} src="https://placeimg.com/128/128/any" className={classes.largeavatar}/>
            <NicknameBox>
                {Nickname}
            </NicknameBox>
            <h3>학번</h3>
            {ID}
            <MannerInfo />

        </Container>
    );
};

export default MyInfo;