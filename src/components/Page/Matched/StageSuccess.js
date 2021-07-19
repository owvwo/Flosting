import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Footer from '../Footer';
import TimerComponent from './Timer.js'
import fire from '../Register/LoginFire.js'
import profileImageBoy from '../../../images/profile_boy_default.png';
import profileImageGirl from '../../../images/profile_girl_default.png';

const db = fire.firestore()

const Container = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
    .ProfileWrap{
        display: flex;
    }
    .text{
        height: 15rem;
        text-align: center;
        margin-top: 4rem;
        font-size: 1.2rem;
    }

`

const TitleWrap = styled.div`
color: white;
background-color: grey;
width: 20rem;
font-size : 2rem;
text-align : center;
margin-top: 2rem;
margin-bottom: 2rem;
font-weight : bolder
`
const LeftProfileWrap = styled.div`
text-align : center;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
margin-right: 1.5rem;

    .defaultPic{
        width: 6rem;
        height: 6rem;
        background-color: grey;
        border-radius: 50%;
    }

    .profileInfo{
        width: 8rem;
    }
`

const RightProfileWrap = styled.div`
text-align : center;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
margin-left: 1.5rem;

    .defaultPic{
        width: 6rem;
        height: 6rem;
        background-color: grey;
        border-radius: 50%;
    }

    .profileInfo{
        width: 8rem;
    }
`


function StageSuccess(props){
    const 유저1 = props.유저1
    const 유저2 = props.유저2
    const 닉네임 = props.닉네임
    const 발전단계변경 = props.발전단계변경
    const 메세지보낸사람 = props.메세지보낸사람

    console.log(props.컬렉션)
    console.log(props.문서번호)
    let[연락상태, 연락상태변경] = useState(false);
    useEffect(()=>{
    },[])

    return(
        <Container>
            <Title/>
            <div className='ProfileWrap'>
                <LeftProfile 유저1={유저1} 메세지보낸사람={메세지보낸사람}/>
                <RightProfile 유저2={유저2} 메세지보낸사람={메세지보낸사람}/>
            </div>
            <div className='text'>
                플로스팅을 이용해주셔서 감사합니다. :)<br/>
            </div>
            <Footer/>
        </Container>
    )
}
export default StageSuccess;


function Title(){
    return(
        <TitleWrap>
            매칭 성공!!
        </TitleWrap>
    )
}

function LeftProfile({유저1, 메세지보낸사람}){
    // console.log(메세지보낸사람)
    // console.log(유저1['Nick'])
    let profileImage=null;

    if(유저1['Gender'] === 'boy'){
        profileImage = profileImageBoy
    }else if(유저1['Gender'] === 'girl') {
        profileImage = profileImageGirl
    }

    return(
            <LeftProfileWrap>
            <div className='defaultPicBox'>
                <img src={profileImage} className='defaultPic'/>
            </div>
                <div className='profileInfo'>
                    {유저1['Nick']}({유저1['Age']})<br/>
                    {유저1['Univ']}<br/>
                    매너온도: {유저1['Manner']}<br/>
                    {유저1['Phone']}<br/>

                </div>
            </LeftProfileWrap>
    )
}

function RightProfile({유저2, 메세지보낸사람}){
    // console.log(메세지보낸사람)
    // console.log(유저2['Nick'])
    let profileImage=null;

    if(유저2['Gender'] === 'boy'){
        profileImage = profileImageBoy
    }else if(유저2['Gender'] === 'girl') {
        profileImage = profileImageGirl
    }

    return(
        <RightProfileWrap>
            <div className='defaultPicBox'>
                <img src={profileImage} className='defaultPic'/>
            </div>
            <div className='profileInfo'>
                {유저2['Nick']}({유저2['Age']})<br/>
                {유저2['Univ']}<br/>
                매너온도: {유저2['Manner']}<br/>
                {유저2['Phone']}<br/>
            </div>
        </RightProfileWrap>
    )
}

