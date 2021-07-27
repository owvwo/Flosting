import React, { Component, useState, useEffect } from 'react'
import styled from 'styled-components';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import kakaochannel from '../../../images/kakaochannel.png'

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
    margin: 0rem 2rem;
    

    h1{
        font-size: 1.5rem;
        margin-top: 2rem;
    }
`;
const School_number = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    margin-top: 2rem;
`;
const School_name = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    margin-top: 2rem;
`;

const School_title = styled.div`
    font-size: 1.0rem;
    color: '#828282';
    margin: 0.5rem 0rem;
`;
const School_content = styled.div`
    margin: 5px 0 0 0;
    font-size: 0.5rem;
    list-style : none;
    li{
        font-size: 0.5rem;
    }
`;

const KakaoChannelBox = styled.div`
    background : #F6ECF8;
    border-radius: 10px;
    border: 1px solid rgb(0,0,0, 0.2);
    padding: 5px;
    list-style : none;
    display: flex;
    align-items: center;
    flex-direction: row;
    img{
        margin: 0px 5px;
        width: 3rem;
        height: 3rem;
    }
    li{
        color: rgb(0,0,0,0.7);
    }
`
const forgotID = (props) => {

    return (
        <ThemeProvider theme={Colortheme}>
            <div>
            <Container>
                <h1>
                    아이디 찾기
                </h1>
                <School_content>
                    <li>아이디는 본인의 학번이에요!</li>
                    <li>회원가입시 잘못 입력한 것이 아니라면 번거롭게 찾으실 필요가 없겠죠?</li>
                </School_content>
                <School_number>
                    <School_title>
                        본인 학번을 잘못 기입하신 학우분께선 아래 카카오채널로 문의해주세요!
                    </School_title>
                </School_number>
                <KakaoChannelBox onClick={ ()=>{window.open('http://pf.kakao.com/_xfuvpK', '_blank')}}>
                    <img calssName='icon' src={kakaochannel} />
                    <li>플로스팅 공식 채널로 이동하기</li>
                </KakaoChannelBox>
            </Container>
            </div>
        </ThemeProvider>
    );
}

export default forgotID;