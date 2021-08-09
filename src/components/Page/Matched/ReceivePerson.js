import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring'
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
const NoticeMessage = styled.div`
 list-style: none;
 li{
     font-size: 0.6rem;
     margin-bottom: 2rem;
 }
`
const TimerWrap = styled.div`
    list-style :  none;
    display: flex;
    justify-content: flex;
    align-items: flex;
    flex-direction: column;
    .Ment{
        text-decoration: underline;
        margin-top: 5px;
        font-size: 0.6rem;
        text-align: center;
    }
`

const TitleContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content : center;
    flex-direction: column;

`
const TitleWrap = styled.div`

    color: rgb(0,0,0, 0.75);
    background: rgb(0,0,0, 0.05);
    width: 20rem;
    height: 4rem;
    display: flex;
    align-items: center;
    justify-content : center;
    font-family: 'Noto Sans KR', sans-serif;
    font-weight: 700;

    font-size : 2rem;
    text-align : center;
    margin-top: 1rem;
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
    .decisionState{
        .ING{
            font-family: 'Do Hyeon', sans-serif;
            border-bottom: 1px solid rgb(0,0,0, 0.2);
            border-top: 3px solid rgb(255,255,255, 1);
            margin-bottom: 5px;
            color: rgb(0,0,0,0.5);
        }
        .ED{
            font-family: 'Do Hyeon', sans-serif;
            border-bottom: 1px solid rgb(0,0,0, 0.2);
            border-top: 3px solid rgb(218,219,247, 0.8);
            margin-bottom: 5px;
        }
    }
    .profileInfo{
        list-style: none;
        width: 8rem;
        .UserNick{
            font-weight: 700;
        }
        a{
            .LookProfile{
                margin-top: 5px;
                border-radius : 5px;
                background: rgb(0,0,0, 0.1);
            }
        }
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
    .decisionState{
        .ING{
            font-family: 'Do Hyeon', sans-serif;
            border-bottom: 1px solid rgb(0,0,0, 0.2);
            border-top: 3px solid rgb(255,255,255, 1);
            margin-bottom: 5px;
            color: rgb(0,0,0,0.5);
        }
        .ED{
            font-family: 'Do Hyeon', sans-serif;
            border-bottom: 1px solid rgb(0,0,0, 0.2);
            border-top: 3px solid rgb(218,219,247, 0.8);
            margin-bottom: 5px;
        }
    }
    .profileInfo{
        list-style: none;
        width: 8rem;
        .UserNick{
            font-weight: 700;
        }
        a{
            .LookProfile{
                margin-top: 5px;
                border-radius : 5px;
                background: rgb(0,0,0, 0.1);
            }
        }
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
}
`
const ReplyMessage = styled.button`
font-family: "Noto Sans KR", sans-serif;
margin-bottom: 1rem;
margin-right: 0.5rem;
margin-left: 0.5rem;
width: 13rem;
height: 3rem;
color : rgb(0,0,0,0.8);
border : 1px solid rgb(0,0,0, 0.2);
font-weight: 700;
border-radius: 40px;
background-color: rgb(218,219,247, 0.8);
&:hover{
    background-color: rgb(188,189,217, 0.8);
    color: white;
}
`

const Refuse = styled.button`
margin-bottom: 1rem;
margin-right: 0.5rem;
margin-left: 0.5rem;
width: 13rem;
height: 3rem;
border : 1px solid rgb(218,219,247, 0.8);
font-weight: 700;
border-radius: 40px;
background-color: white;
&:hover{
    background-color: rgb(217,91,91,0.5);
    color: white;

`


function ReceivePerson(props){
    const 유저1 = props.유저1
    const 유저2 = props.유저2
    const 닉네임 = props.닉네임
    const 발전단계변경 = props.발전단계변경
    const 메세지보낸사람 = props.메세지보낸사람

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
            <li className = "Ment">
            시간이 종료되기 전까지 연락을 해주세요! 
            </li>
            <TimerComponent/>
        </TimerWrap>
    )
}

function Title(){
    return(
        <TitleContainer>
            <TitleWrap>
            매칭 진행 중
            </TitleWrap>
            <NoticeMessage><li>표시와 다르게 상대방에게 메세지가 안오셨다면 카카오 채널을 통해 문의해주세요!</li></NoticeMessage>
        </TitleContainer>
    )
}

function LeftProfile({유저1, 메세지보낸사람}){
    const noneactiveStyle = {
        textDecoration: 'none',
        color: '#2B2A28'
      }

      
    let profileImage=null;

    if(유저1['Gender'] === 'boy'){
        profileImage = profileImageBoy
    }else if(유저1['Gender'] === 'girl') {
        profileImage = profileImageGirl
    }
    let profileNickName = 유저1['Nick']

    return(
            <LeftProfileWrap>
                <div className='decisionState'>
                    {
                    메세지보낸사람 === 유저1['Nick']
                    ? <div className = "ED">메세지보냈음!</div>
                    : <div className = "ING">결정중</div>
                    }
                </div>
                <div>
                    <img src={profileImage} className='defaultPic'/>
                </div>
                <div className='profileInfo'>
                    <li className="UserNick">{유저1['Nick']}</li>
                    <NavLink to = {`/userprofile/${profileNickName}`} style={noneactiveStyle}><li className = "LookProfile">프로필 보기</li></NavLink>
                </div>
            </LeftProfileWrap>
    )
}

function RightProfile({유저2, 메세지보낸사람}){
    const noneactiveStyle = {
        textDecoration: 'none',
        color: '#2B2A28'
      }

    let profileImage=null;

    if(유저2['Gender'] === 'boy'){
        profileImage = profileImageBoy
    }else if(유저2['Gender'] === 'girl') {
        profileImage = profileImageGirl
    }
    let profileNickName = 유저2['Nick']

    return(
        <RightProfileWrap>
            <div className='decisionState'>
                {
                메세지보낸사람 === 유저2['Nick']
                ? <div className = "ED">메세지보냈음!</div>
                : <div className = "ING">결정중</div>
                }
            </div>
            <div className='defaultPicBox'>
                <img src={profileImage} className='defaultPic'/>
            </div>
            <div className='profileInfo'>
                <li className="UserNick">{유저2['Nick']}</li>
                <NavLink to = {`/userprofile/${profileNickName}`} style={noneactiveStyle}><li className = "LookProfile">프로필 보기</li></NavLink>
            </div>
        </RightProfileWrap>
    )
}

function Button(props){

    function onClick_sendMessage(){
        const result = window.confirm('정말로 답장을 보내셨나요?');
        if(result){
            // console.log(props.컬렉션)
            // console.log(props.문서번호)
            db.collection(props.컬렉션).doc(props.문서번호).update({
                stage: 'success'
            })
            alert('좋은 인연이 되시길 기원합니다!')
        }else{}
    }

    function onClick_refuse(){
        const result = window.confirm('정말로 거절하실건가요?');
        // console.log(result)
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
            {/* <NotYet>아직 연락 안왔어요</NotYet> */}
            <ReplyMessage onClick={onClick_sendMessage}>답장했어요</ReplyMessage>
            <Refuse onClick={onClick_refuse}>매칭 거절할게요</Refuse>
        </ButtonWrap>
    )
}

