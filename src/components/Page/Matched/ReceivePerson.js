import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring'
import Footer from '../Footer';
import TimerComponent from './Timer.js'
import fire from '../Register/LoginFire.js'
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

const ButtonWrap = styled.div`
text-align:center;
margin-top: 2rem;
`
const NotYet = styled.button`
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
const ReplyMessage = styled.button`
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


function ReceivePerson(props){
    const 유저1 = props.유저1
    const 유저2 = props.유저2
    const 닉네임 = props.닉네임
    const 발전단계변경 = props.발전단계변경
    const 메세지보낸사람 = props.메세지보낸사람

    console.log(props.컬렉션)
    console.log(props.문서번호)
    console.log(props.닉네임)

    return(
        <Container>
            <Timer/>
            <Title/>
            <div className='ProfileWrap'>
                <LeftProfile 유저1={유저1} 메세지보낸사람={메세지보낸사람}/>
                <RightProfile 유저2={유저2} 메세지보낸사람={메세지보낸사람}/>
            </div>
            <Button 컬렉션={props.컬렉션} 문서번호={props.문서번호} 닉네임={props.닉네임}/>
            <Footer/>
        </Container>
    )
}
export default ReceivePerson;

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

function LeftProfile({유저1, 메세지보낸사람}){
    console.log(메세지보낸사람)
    console.log(유저1['Nick'])
    return(
            <LeftProfileWrap>
                <div className='decisionState'>
                    {
                    메세지보낸사람 === 유저1['Nick']
                    ? <div>메세지보냈음!</div>
                    : <div>결정중</div>
                    }
                </div>
                <div className='defaultPic'></div>
                <div className='profileInfo'>
                    {유저1['Nick']}({유저1['Age']})<br/>
                    {유저1['Univ']}<br/>
                    {유저1['Manner']}<br/>
                    {유저1['Phone']}<br/>

                </div>
            </LeftProfileWrap>
    )
}

function RightProfile({유저2, 메세지보낸사람}){
    console.log(메세지보낸사람)
    console.log(유저2['Nick'])

    return(
        <RightProfileWrap>
            <div className='decisionState'>
                {
                메세지보낸사람 === 유저2['Nick']
                ? <div>메세지보냈음!</div>
                : <div>결정중</div>
                }
            </div>
            <div className='defaultPic'></div>
            <div className='profileInfo'>
                {유저2['Nick']}({유저2['Age']})<br/>
                {유저2['Univ']}<br/>
                {유저2['Manner']}<br/>
                {유저2['Phone']}<br/>
            </div>
        </RightProfileWrap>
    )
}

function Button(props){

    function onClick_sendMessage(){
        const result = window.confirm('정말로 답장을 보내셨나요?');
        if(result){
            console.log(props.컬렉션)
            console.log(props.문서번호)
            db.collection(props.컬렉션).doc(props.문서번호).update({
                stage: 'success'
            })
            alert('좋은 인연이 되시길 기원합니다!')
        }else{}
    }

    function onClick_refuse(){
        const result = window.confirm('정말로 거절하실건가요?');
        console.log(result)
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
            <NotYet>아직 연락 안왔어요</NotYet>
            <ReplyMessage onClick={onClick_sendMessage}>답장했어요</ReplyMessage>
            <Refuse onClick={onClick_refuse}>매칭 거절할게요</Refuse>
        </ButtonWrap>
    )
}

