import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Footer from '../Footer';
import TimerComponent from './Timer.js'
import fire from '../Register/LoginFire.js'
import profileImageBoy from '../../../images/profile_boy_default.png';
import profileImageGirl from '../../../images/profile_girl_default.png';
import { NavLink,Link } from 'react-router-dom';
const db = fire.firestore()

const Container = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
    .ProfileWrap{
        display: flex;
    }
`

const TimerWrap = styled.div`
text-align: center;
color: red;
margin-top: 1rem;
`

const TitleWrap = styled.div`
color: white;
background-color: grey;
width: 20rem;
font-size : 2rem;
text-align : center;
margin-top: 1rem;
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

const ButtonWrap = styled.div`
text-align:center;
margin-top: 2rem;
`
const Agree = styled.button`
margin-bottom: 1rem;
width: 13rem;
height: 3rem;
border : 1px solid yellow;
border-radius: 40px;
background-color: pink;
&:hover{
    background-color: yellow;
    color: pink;
`
const Refuse = styled.button`
margin-bottom: 1rem;
width: 13rem;
height: 3rem;
border : 1px solid yellow;
border-radius: 40px;
background-color: red;
&:hover{
    background-color: grey;
    color: pink;
`


function StageZero(props){

    
    return(
        <Container>
            <Timer/>
            <Title/>
            <div className='ProfileWrap'>
                <LeftProfile 유저1={props.유저1} />
                <RightProfile 유저2={props.유저2} />
            </div>
            <Button 컬렉션={props.컬렉션} 문서번호={props.문서번호} 닉네임={props.닉네임} 회원정보문서아이디={props.회원정보문서아이디} 유저정보={props.유저정보}/>
            <Footer/>
        </Container>
    )
}
export default StageZero;

function Timer(){
    return(
        <TimerWrap>
            <div>
                플로스팅 종료까지
            </div>
            <TimerComponent/>
        </TimerWrap>
    )
}

function Title(){
    return(
        <TitleWrap>
            매칭 진행 중
        </TitleWrap>
    )
}

function LeftProfile({유저1}){

    let profileImage=null;

    if(유저1['Gender'] === 'boy'){
        profileImage = profileImageBoy
    }else if(유저1['Gender'] === 'girl') {
        profileImage = profileImageGirl
    }

    let profileNickName = 유저1['Nick']

    return(
            <LeftProfileWrap>
                <div>결정중</div>
                <div>
                    <img src={profileImage} className='defaultPic'/>
                </div>
                <div className='profileInfo'>
                    {유저1['Nick']}님<br/>
                    <Link to = {`/userprofile/${profileNickName}`}><div>프로필 보기</div></Link>
                </div>
            </LeftProfileWrap>
    )
}
function RightProfile({유저2}){

    let profileImage=null;

    if(유저2['Gender'] === 'boy'){
        profileImage = profileImageBoy
    }else if(유저2['Gender'] === 'girl') {
        profileImage = profileImageGirl
    }

    let profileNickName = 유저2['Nick']

    return(
        <RightProfileWrap>
            <div>결정중</div>
            <div className='defaultPicBox'>
                <img src={profileImage} className='defaultPic'/>
            </div>
            <div className='profileInfo'>
                {유저2['Nick']}님<br/>
                <Link to = {`/userprofile/${profileNickName}`}><div>프로필 보기</div></Link>
            </div>
        </RightProfileWrap>
    )
}

// function LeftProfile({유저1}){

//     let profileImage=null;

//     if(유저1['Gender'] === 'boy'){
//         profileImage = profileImageBoy
//     }else if(유저1['Gender'] === 'girl') {
//         profileImage = profileImageGirl
//     }
//     return(
//             <LeftProfileWrap>
//                 <div>결정중</div>
//                 <div>
//                     <img src={profileImage} className='defaultPic'/>
//                 </div>
//                 <div className='profileInfo'>
//                     {유저1['Nick']}({유저1['Age']})<br/>
//                     {유저1['Univ']}<br/>
//                     매너온도: {유저1['Manner']}<br/>
//                     {유저1['Phone']}<br/>

//                 </div>
//             </LeftProfileWrap>
//     )
// }

// function RightProfile({유저2}){

//     let profileImage=null;

//     if(유저2['Gender'] === 'boy'){
//         profileImage = profileImageBoy
//     }else if(유저2['Gender'] === 'girl') {
//         profileImage = profileImageGirl
//     }

//     return(
//         <RightProfileWrap>
//             <div>결정중</div>
//             <div className='defaultPicBox'>
//                 <img src={profileImage} className='defaultPic'/>
//             </div>
//             <div className='profileInfo'>
//                 {유저2['Nick']}({유저2['Age']})<br/>
//                 {유저2['Univ']}<br/>
//                 매너온도: {유저2['Manner']}<br/>
//                 {유저2['Phone']}<br/>
//             </div>
//         </RightProfileWrap>
//     )
// }

function Button(props){
    function onClick_sendMessage(){
        const result = window.confirm('정말로 먼저 연락을 보내셨나요?');
        if(result){
            db.collection(props.컬렉션).doc(props.문서번호).update({
                stage: 'half'
            })
            db.collection(props.컬렉션).doc(props.문서번호).update({
                메세지보낸사람: props.닉네임
            })
            db.collection('회원정보').doc(props.회원정보문서아이디).update({
                User:{
                    'Age': props.유저정보['Age'],
                    'Gender':props.유저정보['Gender'],
                    'Manner': props.유저정보['Manner']+1,
                    'Nick': props.유저정보['Nick'],
                    'Phone': props.유저정보['Phone'],
                    'Univ': props.유저정보['Univ']
                }
            })
            alert('매너온도가 상승했습니다! 좋은 결과 기원합니다 :)')
        }else{}
    }
    function onClick_refuse(){
        const result = window.confirm('정말로 거절하실건가요?');
        if(result){
            db.collection(props.컬렉션).doc(props.문서번호).update({
                stage: 'end'
            })
            db.collection(props.컬렉션).doc(props.문서번호).update({
                거절한사람: props.닉네임
            })
            alert('매칭을 거절하셨습니다.')
        }else{}
    }

    return(
        <ButtonWrap>
            <Agree onClick={onClick_sendMessage}>먼저 연락했어요!</Agree>
            <Refuse onClick={onClick_refuse}>거절할래요</Refuse>
        </ButtonWrap>
    )
}







