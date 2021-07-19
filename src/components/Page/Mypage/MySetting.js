import React, { Component, useState, useEffect } from 'react'

import styled from 'styled-components';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import fire from '../Register/LoginFire';
import MatchingManager from './MatchingManager';

const Colortheme = createMuiTheme({
    palette: {
        primary: {
            main: '#E0BCC1'
        }
    },
    typography: {
        fontSize: 10,
        fontWeightRegular: 700,
        fontFamily: "Noto Sans KR"
    }

})

const Container = styled.div`
    font-family: 'Noto Sans KR', sans-serif;
    font-weight: 400;

    h1{
        font-size: 1.5rem;
    }
`;

const MySetting = (props) => {

    const user = props.user;
    const db = fire.firestore();
    const [ID, setID] = useState('');
    const [isManager, setisManager] = useState(false);

    useEffect(() => {
        if(user){
        let s_id = user.email.split('@');
        setID(s_id[0]);
        let Infodb = db.collection("회원정보");
        let query = Infodb.where("ID", "==", s_id[0]).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if(doc.data().User.Nick == "후닝"){
                    setisManager(true);
                }
            });
        });
    }
    }, [user]);

    if(isManager){
        return(
            <MatchingManager user = {user}></MatchingManager>
        )
    }else{
        return (
            <ThemeProvider theme={Colortheme}>
                <Container>
                    <h1>
                        내 정보변경
                    </h1>
                    
                </Container>
            </ThemeProvider>
        );
    }
}

export default MySetting;